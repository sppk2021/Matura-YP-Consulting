import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import { doc, getDoc, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { fallbackPosts } from '../constants/blog';

// ============================================================================
// Blog / Process Section Component
// ============================================================================

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mediumUrl, setMediumUrl] = useState('https://medium.com');

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        // 1. Fetch Settings (Medium Username)
        const settingsSnap = await getDoc(doc(db, 'settings', 'global'));
        const storedUsername = settingsSnap.exists() ? settingsSnap.data().mediumUsername : null;
        
        let mediumPosts: any[] = [];
        if (storedUsername && storedUsername !== '@medium') {
          const formattedUser = storedUsername.startsWith('@') ? storedUsername : `@${storedUsername}`;
          setMediumUrl(`https://medium.com/${formattedUser}`);
          const mediumRSSUrl = `https://medium.com/feed/${formattedUser}`; 
          const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${mediumRSSUrl}`;

          try {
            const res = await fetch(rss2jsonUrl);
            const data = await res.json();
            if (data.status === 'ok' && data.items) {
              mediumPosts = data.items.map((item: any) => {
                // Extract thumbnail from content if not provided directly
                let thumbnail = item.thumbnail;
                if (!thumbnail || thumbnail === '') {
                  const content = item.content || item.description || '';
                  const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
                  thumbnail = imgMatch ? imgMatch[1] : 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800';
                }

                return {
                  title: item.title,
                  pubDate: item.pubDate,
                  link: item.link,
                  thumbnail: thumbnail,
                  description: item.description.replace(/<[^>]+>/g, '').substring(0, 120) + '...'
                };
              });
            }
          } catch (err) {
            console.error('Error fetching Medium posts:', err);
          }
        }

        // 2. Fetch Custom Posts
        const customPostsQuery = query(collection(db, 'customPosts'), orderBy('createdAt', 'desc'));
        const customPostsSnap = await getDocs(customPostsQuery);
        const customPosts = customPostsSnap.docs.map(doc => doc.data());

        // 3. Combine and Set
        const combined = [...customPosts, ...mediumPosts]
          .filter(post => post.title !== 'TEST') // Filter out test posts
          .slice(0, 3);
        
        setPosts(combined.length > 0 ? combined : fallbackPosts);
      } catch (err) {
        console.error("Error fetching blog data:", err);
        setPosts(fallbackPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <section id="blog" className="section-padding relative bg-brand-navy/95 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-4 block"
          >
            News & Insights
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Latest News & Articles
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-lg"
          >
            Explore our latest articles, case studies, and step-by-step guides on how we deliver excellence in auditing, consulting, and business setup.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Skeleton Loading State
            [...Array(3)].map((_, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden h-[500px] animate-pulse">
                <div className="h-64 bg-white/10"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 w-24 bg-white/10 rounded"></div>
                  <div className="h-8 w-full bg-white/10 rounded"></div>
                  <div className="h-20 w-full bg-white/10 rounded"></div>
                  <div className="h-10 w-32 bg-white/10 rounded pt-4"></div>
                </div>
              </div>
            ))
          ) : (
            posts.map((post, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-brand-gold/40 transition-all duration-300 group flex flex-col h-full shadow-lg"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                  <img 
                    src={post.thumbnail} 
                    alt={post.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-brand-navy to-transparent opacity-60 z-10"></div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-brand-gold/80 text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.pubDate}>{formatDate(post.pubDate)}</time>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-gold transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.description}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-white/10">
                    <a 
                      href={post.link} 
                      target={post.link !== '#' ? "_blank" : "_self"}
                      rel={post.link !== '#' ? "noopener noreferrer" : ""}
                      className="inline-flex items-center gap-2 text-brand-gold font-medium hover:text-white transition-colors"
                    >
                      Read Full Article
                      {post.link !== '#' ? (
                        <ExternalLink className="w-4 h-4" />
                      ) : (
                        <ArrowRight className="w-4 h-4" />
                      )}
                    </a>
                  </div>
                </div>
              </motion.article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
