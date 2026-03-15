import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, RefreshCw, ExternalLink, Plus, Sparkles, Trash2, Lock, User, ShieldCheck, LogIn, Edit2, X, Scale } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { signInWithPopup, signOut, onAuthStateChanged, signInWithEmailAndPassword, RecaptchaVerifier } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, onSnapshot, addDoc, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase';

export default function Dashboard() {
  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [recaptchaSolved, setRecaptchaSolved] = useState(false);
  const recaptchaVerifierRef = React.useRef<RecaptchaVerifier | null>(null);

  // Curated Posts State
  const [customPosts, setCustomPosts] = useState<any[]>([]);
  const [newPostLink, setNewPostLink] = useState('');
  const [newPostTopic, setNewPostTopic] = useState('');
  const [suggestedTitles, setSuggestedTitles] = useState<string[]>([]);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [suggesting, setSuggesting] = useState(false);
  
  // Edit Post State
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editLink, setEditLink] = useState('');
  const [editThumbnail, setEditThumbnail] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  // Admin Management State
  const [allowedAdmins, setAllowedAdmins] = useState<any[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [adminSuccess, setAdminSuccess] = useState('');

  // Publications State
  const [publications, setPublications] = useState<any[]>([]);
  const [newPubCategory, setNewPubCategory] = useState('');
  const [newPubTitle, setNewPubTitle] = useState('');
  const [newPubLink, setNewPubLink] = useState('');
  const [isPubSaving, setIsPubSaving] = useState(false);
  const [editingPub, setEditingPub] = useState<any | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        let adminStatus = false;
        
        // Check if user is admin (hardcoded primary admin or check firestore)
        if (user.email?.toLowerCase() === 'sawpyaephyokyaw7@gmail.com') {
          adminStatus = true;
        } else {
          try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            const allowedAdminDoc = user.email ? await getDoc(doc(db, 'allowedAdmins', user.email.toLowerCase())) : null;
            
            if ((userDoc.exists() && userDoc.data().role === 'admin') || 
                (allowedAdminDoc && allowedAdminDoc.exists() && allowedAdminDoc.data().role === 'admin')) {
              adminStatus = true;
            }
          } catch (e) {
            console.error("Error checking admin status:", e);
          }
        }
        
        setIsAdmin(adminStatus);
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    // Load Custom Posts
    const q = query(collection(db, 'customPosts'), orderBy('createdAt', 'desc'));
    const unsubscribePosts = onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCustomPosts(posts);
    }, (err) => {
      console.error("Error loading custom posts:", err);
    });

    // Load Allowed Admins - Only if user is admin
    let unsubscribeAdmins = () => {};
    if (isAdmin) {
      const adminsQuery = query(collection(db, 'allowedAdmins'), orderBy('createdAt', 'desc'));
      unsubscribeAdmins = onSnapshot(adminsQuery, (snapshot) => {
        const admins = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllowedAdmins(admins);
      }, (err) => {
        console.error("Error loading allowed admins:", err);
      });
    }

    // Load Publications
    const pubQuery = query(collection(db, 'publications'), orderBy('category', 'asc'));
    const unsubscribePubs = onSnapshot(pubQuery, (snapshot) => {
      const pubs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPublications(pubs);
    }, (err) => {
      console.error("Error loading publications:", err);
    });

    return () => {
      unsubscribePosts();
      unsubscribeAdmins();
      unsubscribePubs();
    };
  }, [isLoggedIn, isAdmin]);

  useEffect(() => {
    if (!isLoggedIn && !authLoading && !recaptchaVerifierRef.current) {
      const timer = setTimeout(() => {
        const el = document.getElementById('recaptcha-container');
        if (el && !recaptchaVerifierRef.current) {
          try {
            recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
              size: 'normal',
              callback: () => {
                setRecaptchaSolved(true);
              },
              'expired-callback': () => {
                setRecaptchaSolved(false);
              }
            });
            recaptchaVerifierRef.current.render();
          } catch (e) {
            console.error("reCAPTCHA initialization error:", e);
          }
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, authLoading]);

  const handleLogin = async () => {
    setLoginError('');
    setIsLoggingIn(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error(err);
      setLoginError(err.message || 'Failed to sign in.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError('Please enter both email and password.');
      return;
    }
    setLoginError('');
    setIsLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/multi-factor-auth-required') {
        setLoginError('2FA is required for this account. Please use Google Sign-In or configure a custom MFA flow.');
      } else if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setLoginError('Invalid email or password.');
      } else {
        setLoginError(err.message || 'Failed to sign in.');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSuggestTitles = async () => {
    if (!newPostLink || !newPostTopic) return;
    setSuggesting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: (import.meta as any).env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY });
      const prompt = `I have a Medium blog post about: "${newPostTopic}". The link is: ${newPostLink}. Please suggest 3 catchy, professional, and engaging titles for this post. Return ONLY the 3 titles, separated by newlines, with no extra text or numbering.`;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      
      const titles = response.text?.split('\n').filter(t => t.trim().length > 0).map(t => t.replace(/^\d+\.\s*/, '').replace(/^[-*]\s*/, '').trim()) || [];
      setSuggestedTitles(titles.slice(0, 3));
      if (titles.length > 0) setSelectedTitle(titles[0]);
    } catch (err) {
      console.error("Error suggesting titles:", err);
      alert("Failed to suggest titles. Please check your API key or try again.");
    }
    setSuggesting(false);
  };

  const handleSaveCustomPost = async () => {
    if (!isAdmin) {
      alert("You do not have permission to save posts.");
      return;
    }
    if (!newPostLink || !selectedTitle) return;
    
    const newPost = {
      title: selectedTitle,
      link: newPostLink,
      pubDate: new Date().toISOString(),
      description: newPostTopic,
      thumbnail: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&q=80&w=800', // Default thumbnail
      createdAt: new Date().toISOString()
    };

    try {
      await addDoc(collection(db, 'customPosts'), newPost);
      // Reset form
      setNewPostLink('');
      setNewPostTopic('');
      setSuggestedTitles([]);
      setSelectedTitle('');
    } catch (err: any) {
      console.error(err);
      alert(`Failed to save post: ${err.message || 'Check permissions.'}`);
    }
  };

  const handleEditClick = (post: any) => {
    setEditingPost(post);
    setEditTitle(post.title || '');
    setEditLink(post.link || '');
    setEditThumbnail(post.thumbnail || '');
    setEditDescription(post.description || '');
  };

  const handleUpdateCustomPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin || !editingPost) return;
    
    setIsUpdating(true);
    try {
      await updateDoc(doc(db, 'customPosts', editingPost.id), {
        title: editTitle,
        link: editLink,
        thumbnail: editThumbnail,
        description: editDescription
      });
      setEditingPost(null);
    } catch (err: any) {
      console.error(err);
      alert(`Failed to update post: ${err.message || 'Check permissions.'}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteCustomPost = async (id: string) => {
    if (!isAdmin) {
      alert("You do not have permission to delete posts.");
      return;
    }
    try {
      await deleteDoc(doc(db, 'customPosts', id));
      setPostToDelete(null);
    } catch (err) {
      console.error(err);
      alert('Failed to delete post.');
    }
  };

  /* ============================================================================
   * ADMIN SETUP GUIDE
   * ============================================================================
   * To add a new administrator to this dashboard:
   * 1. The Primary Admin (sawpyaephyokyaw7@gmail.com) must log in.
   * 2. Use the UI below to add the new admin's email to the `allowedAdmins` collection.
   *    (This grants them read/write access in Firestore Security Rules).
   * 3. For Email/Password login: Go to Firebase Console -> Authentication -> Users
   *    and click "Add User". Create an account with the exact same email and a password.
   * 4. Provide the password to the new admin.
   * Note: If the new admin uses a Google account, step 3 is not required. They can
   * just use "Sign in with Google".
   * ============================================================================ */
  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      setAdminError("You do not have permission to add admins.");
      return;
    }
    if (!newAdminEmail || !newAdminPassword) {
      setAdminError("Email and password are required.");
      return;
    }
    
    setAdminError('');
    setAdminSuccess('');
    setIsLoggingIn(true);
    
    try {
      // 1. Create user in Firebase Auth via our backend
      const response = await fetch('/api/admin/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: newAdminEmail.toLowerCase(), 
          password: newAdminPassword,
          adminUid: auth.currentUser?.uid // For verification on backend
        })
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to create user in Firebase Auth.');
      }

      // 2. Add to allowedAdmins collection
      await setDoc(doc(db, 'allowedAdmins', newAdminEmail.toLowerCase()), {
        email: newAdminEmail.toLowerCase(),
        role: 'admin',
        createdAt: new Date().toISOString()
      });

      setNewAdminEmail('');
      setNewAdminPassword('');
      setAdminSuccess('Admin created and added successfully.');
      setTimeout(() => setAdminSuccess(''), 5000);
    } catch (err: any) {
      console.error(err);
      setAdminError(err.message || 'Failed to add admin.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSavePublication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    if (!newPubCategory || !newPubTitle || !newPubLink) return;

    setIsPubSaving(true);
    try {
      if (editingPub) {
        await updateDoc(doc(db, 'publications', editingPub.id), {
          category: newPubCategory,
          title: newPubTitle,
          link: newPubLink
        });
        setEditingPub(null);
      } else {
        await addDoc(collection(db, 'publications'), {
          category: newPubCategory,
          title: newPubTitle,
          link: newPubLink,
          createdAt: new Date().toISOString()
        });
      }
      setNewPubCategory('');
      setNewPubTitle('');
      setNewPubLink('');
    } catch (err: any) {
      console.error(err);
      alert(`Failed to save publication: ${err.message}`);
    } finally {
      setIsPubSaving(false);
    }
  };

  const handleDeletePublication = async (id: string) => {
    if (!isAdmin) return;
    if (!confirm('Are you sure you want to delete this publication?')) return;
    try {
      await deleteDoc(doc(db, 'publications', id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete publication.');
    }
  };

  const handleRemoveAdmin = async (emailId: string) => {
    if (!isAdmin) {
      alert("You do not have permission to remove admins.");
      return;
    }
    if (emailId === 'sawpyaephyokyaw7@gmail.com') {
      alert("Cannot remove the primary admin.");
      return;
    }
    try {
      await deleteDoc(doc(db, 'allowedAdmins', emailId));
    } catch (err) {
      console.error(err);
      alert('Failed to remove admin.');
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-brand-navy flex items-center justify-center p-6">
        <RefreshCw className="w-8 h-8 text-brand-gold animate-spin" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-brand-navy flex items-center justify-center p-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-brand-gold" />
            </div>
            <h1 className="text-2xl font-bold text-white font-serif">Admin Sign In</h1>
            <p className="text-gray-400 text-sm mt-2">Sign in to access the dashboard.</p>
          </div>
          
          {loginError && (
            <div className="mb-5 p-4 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg text-sm">
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold mb-1">Sign In Error</p>
                  <p className="leading-relaxed">{loginError}</p>
                  
                  {loginError.includes('unauthorized-domain') && (
                    <div className="mt-3 pt-3 border-t border-red-500/20">
                      <p className="font-bold text-white mb-1">How to fix this:</p>
                      <ol className="list-decimal list-inside space-y-1 text-xs opacity-90">
                        <li>Go to <a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer" className="underline hover:text-white">Firebase Console</a></li>
                        <li>Select your project</li>
                        <li>Go to <strong>Authentication</strong> &gt; <strong>Settings</strong> &gt; <strong>Authorized domains</strong></li>
                        <li>Click <strong>Add domain</strong> and add <code className="bg-black/20 px-1 rounded">maturayp.com</code></li>
                      </ol>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-brand-navy/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold focus:ring-1 transition-all"
                  placeholder="admin@example.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-brand-navy/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold focus:ring-1 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex justify-center my-4">
              <div id="recaptcha-container"></div>
            </div>

            <button 
              type="submit"
              disabled={isLoggingIn || !recaptchaSolved}
              className="w-full bg-brand-gold hover:bg-yellow-500 text-brand-navy font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              {isLoggingIn ? <RefreshCw className="w-5 h-5 animate-spin" /> : <LogIn className="w-5 h-5" />}
              Sign In
            </button>
          </form>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#1a1f2e] text-gray-500">Or continue with</span>
            </div>
          </div>

          <button 
            type="button"
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="w-full bg-white text-gray-900 hover:bg-gray-100 font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-colors disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign in with Google
          </button>
          
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-gray-400 hover:text-brand-gold transition-colors">
              &larr; Back to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-navy text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-brand-gold hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Website
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 hidden sm:inline-block">{auth.currentUser?.email}</span>
            <button onClick={handleLogout} className="text-sm text-gray-400 hover:text-white border border-white/10 px-4 py-2 rounded-lg transition-colors">
              Sign Out
            </button>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-2 font-serif">Admin Dashboard</h1>
        <p className="text-gray-400 mb-8">Manage your website integrations and curated posts.</p>

        {!isAdmin && (
          <div className="mb-8 p-4 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 shrink-0" />
            <p className="text-sm">
              <strong>Access Restricted:</strong> You are signed in as {auth.currentUser?.email}, but you do not have admin privileges. You can view the dashboard but cannot save changes.
            </p>
          </div>
        )}
        
        <div className="grid lg:grid-cols-1 gap-8 mb-8">
          {/* Section 1: Curate Custom Posts with AI */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg flex flex-col">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-gold" />
              Curate Custom Post
            </h2>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Add a specific Medium post link and use AI to suggest the best title for your audience.
            </p>
            
            <div className="space-y-4 flex-grow">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Medium Post Link</label>
                <input
                  type="url"
                  value={newPostLink}
                  onChange={(e) => setNewPostLink(e.target.value)}
                  placeholder="https://medium.com/..."
                  disabled={!isAdmin}
                  className="w-full bg-brand-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold focus:ring-1 transition-all disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Topic / Draft Title</label>
                <input
                  type="text"
                  value={newPostTopic}
                  onChange={(e) => setNewPostTopic(e.target.value)}
                  placeholder="e.g., How to do financial audits"
                  disabled={!isAdmin}
                  className="w-full bg-brand-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold focus:ring-1 transition-all disabled:opacity-50"
                />
              </div>

              {suggestedTitles.length === 0 ? (
                <button
                  onClick={handleSuggestTitles}
                  disabled={suggesting || !newPostLink || !newPostTopic || !isAdmin}
                  className="w-full border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-navy transition-colors py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {suggesting ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                  Suggest Best Titles
                </button>
              ) : (
                <div className="bg-brand-navy/50 p-4 rounded-lg border border-white/10 space-y-3">
                  <p className="text-sm text-gray-300 font-medium mb-2">Select the best title:</p>
                  {suggestedTitles.map((title, idx) => (
                    <label key={idx} className="flex items-start gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="suggestedTitle" 
                        value={title}
                        checked={selectedTitle === title}
                        onChange={() => setSelectedTitle(title)}
                        className="mt-1 text-brand-gold focus:ring-brand-gold bg-brand-navy border-white/20"
                      />
                      <span className={`text-sm ${selectedTitle === title ? 'text-white font-medium' : 'text-gray-400 group-hover:text-gray-300'}`}>
                        {title}
                      </span>
                    </label>
                  ))}
                  
                  <div className="pt-2 border-t border-white/10 mt-2">
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Or enter a custom title:</label>
                    <input
                      type="text"
                      value={selectedTitle}
                      onChange={(e) => setSelectedTitle(e.target.value)}
                      placeholder="Type your own title here..."
                      className="w-full bg-brand-navy border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold focus:ring-1 transition-all"
                    />
                  </div>

                  <button
                    onClick={handleSaveCustomPost}
                    disabled={!selectedTitle || !isAdmin}
                    className="btn-primary w-full py-2 mt-4 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4" /> Add to Website
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Publications & Laws */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Scale className="w-5 h-5 text-brand-gold" />
              Publications & Laws
            </h2>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Manage the legal documents and resources shown on the website.
            </p>

            <form onSubmit={handleSavePublication} className="space-y-4 mb-8 bg-brand-navy/30 p-4 rounded-lg border border-white/5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Category</label>
                  <select
                    value={newPubCategory}
                    onChange={(e) => setNewPubCategory(e.target.value)}
                    required
                    disabled={!isAdmin}
                    className="w-full bg-brand-navy border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-gold transition-all"
                  >
                    <option value="">Select Category</option>
                    <option value="Company Law">Company Law</option>
                    <option value="Tax Law">Tax Law</option>
                    <option value="CBM">CBM</option>
                    <option value="MOC">MOC</option>
                    <option value="Labor">Labor</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Document Title</label>
                  <input
                    type="text"
                    value={newPubTitle}
                    onChange={(e) => setNewPubTitle(e.target.value)}
                    placeholder="e.g., Myanmar Companies Law"
                    required
                    disabled={!isAdmin}
                    className="w-full bg-brand-navy border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Link URL (PDF or Website)</label>
                <input
                  type="url"
                  value={newPubLink}
                  onChange={(e) => setNewPubLink(e.target.value)}
                  placeholder="https://..."
                  required
                  disabled={!isAdmin}
                  className="w-full bg-brand-navy border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-all"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isPubSaving || !isAdmin}
                  className="btn-primary flex-grow py-2 text-sm flex items-center justify-center gap-2"
                >
                  {isPubSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : (editingPub ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />)}
                  {editingPub ? 'Update Publication' : 'Add Publication'}
                </button>
                {editingPub && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingPub(null);
                      setNewPubCategory('');
                      setNewPubTitle('');
                      setNewPubLink('');
                    }}
                    className="px-4 py-2 border border-white/10 rounded-lg text-sm hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {publications.map((pub) => (
                <div key={pub.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 group">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">{pub.category}</span>
                    <span className="text-sm font-medium text-white">{pub.title}</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => {
                        setEditingPub(pub);
                        setNewPubCategory(pub.category);
                        setNewPubTitle(pub.title);
                        setNewPubLink(pub.link);
                      }}
                      className="p-1.5 text-blue-400 hover:bg-blue-400/10 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePublication(pub.id)}
                      className="p-1.5 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {publications.length === 0 && (
                <div className="text-center py-8 text-gray-500 text-sm italic">
                  No publications added yet.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Admin Management */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-brand-gold" />
            Admin Management
          </h2>
          <p className="text-gray-300 text-sm mb-6 leading-relaxed">
            Add or remove email addresses that are allowed to sign in as administrators.
          </p>
          
          <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <h4 className="text-sm font-bold text-blue-400 mb-2">Admin Setup Guide:</h4>
            <ol className="text-xs text-gray-300 list-decimal list-inside space-y-1">
              <li>Add the new admin's email address below to grant them database access.</li>
              <li>If they use Google Sign-In, they are all set!</li>
              <li>If they need an Email/Password login, go to your <strong>Firebase Console &gt; Authentication &gt; Users</strong> and create an account with the same email and a secure password.</li>
            </ol>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <form onSubmit={handleAddAdmin} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">New Admin Email</label>
                  <input
                    type="email"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    placeholder="colleague@example.com"
                    disabled={!isAdmin || isLoggingIn}
                    className="w-full bg-brand-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold focus:ring-1 transition-all disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Initial Password</label>
                  <input
                    type="password"
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={!isAdmin || isLoggingIn}
                    className="w-full bg-brand-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold focus:ring-1 transition-all disabled:opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!newAdminEmail || !newAdminPassword || !isAdmin || isLoggingIn}
                  className="btn-primary flex items-center justify-center gap-2 w-full py-3 disabled:opacity-50"
                >
                  {isLoggingIn ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                  Create & Add Admin
                </button>
              </form>
              {adminSuccess && (
                <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg text-sm">
                  {adminSuccess}
                </div>
              )}
              {adminError && (
                <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg text-sm">
                  {adminError}
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-4">Current Admins</h3>
              <div className="bg-brand-navy/50 border border-white/10 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <span className="text-sm text-gray-300">sawpyaephyokyaw7@gmail.com</span>
                  <span className="text-xs bg-brand-gold/20 text-brand-gold px-2 py-1 rounded">Primary</span>
                </div>
                {allowedAdmins.map((admin) => (
                  <div key={admin.id} className="flex items-center justify-between p-4 border-b border-white/10 last:border-0">
                    <span className="text-sm text-gray-300">{admin.email}</span>
                    <button
                      onClick={() => handleRemoveAdmin(admin.id)}
                      disabled={!isAdmin}
                      className="text-gray-500 hover:text-red-400 transition-colors disabled:opacity-50"
                      title="Remove Admin"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {allowedAdmins.length === 0 && (
                  <div className="p-4 text-sm text-gray-500 text-center">
                    No additional admins added.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview Section */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 shadow-lg">
          <h2 className="text-xl font-bold mb-6">Live Website Preview</h2>
          
          {/* Custom Curated Posts */}
          {customPosts.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-bold text-brand-gold uppercase tracking-wider mb-4">Curated Posts</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {customPosts.map((post, idx) => (
                  <div key={idx} className="bg-brand-navy border border-brand-gold/30 rounded-lg overflow-hidden flex flex-col relative group">
                    {isAdmin && (
                      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <button 
                          onClick={() => handleEditClick(post)}
                          className="bg-blue-500/80 text-white p-1.5 rounded-md hover:bg-blue-500"
                          title="Edit Post"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setPostToDelete(post.id)}
                          className="bg-red-500/80 text-white p-1.5 rounded-md hover:bg-red-500"
                          title="Remove Post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    <div className="h-32 overflow-hidden bg-white/5 shrink-0">
                      <img src={post.thumbnail} alt="" className="w-full h-full object-cover" loading="lazy" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-bold text-sm mb-2 line-clamp-2">{post.title}</h3>
                      <div className="mt-auto pt-2">
                        <a href={post.link} target="_blank" rel="noreferrer" className="text-brand-gold text-xs flex items-center gap-1 hover:underline w-fit">
                          View Post <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Post Modal */}
      {editingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-brand-navy border border-white/10 rounded-xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <h3 className="font-bold text-lg">Edit Curated Post</h3>
              <button 
                onClick={() => setEditingPost(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleUpdateCustomPost} className="p-6 overflow-y-auto flex-grow space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-brand-navy/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold focus:ring-1"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Link URL</label>
                <input
                  type="url"
                  value={editLink}
                  onChange={(e) => setEditLink(e.target.value)}
                  className="w-full bg-brand-navy/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold focus:ring-1"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Thumbnail Image URL</label>
                <input
                  type="url"
                  value={editThumbnail}
                  onChange={(e) => setEditThumbnail(e.target.value)}
                  className="w-full bg-brand-navy/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold focus:ring-1"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Description / Topic</label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-brand-navy/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold focus:ring-1 resize-none"
                  required
                />
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="btn-primary px-6 py-2 rounded-lg text-sm flex items-center gap-2 disabled:opacity-50"
                >
                  {isUpdating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {postToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-brand-navy border border-white/10 rounded-xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-white mb-4">Delete Post</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setPostToDelete(null)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteCustomPost(postToDelete)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


