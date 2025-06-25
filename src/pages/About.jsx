import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiAward, FiStar, FiHeart, FiMapPin, FiMail, FiTwitter, FiInstagram } = FiIcons;

const About = () => {
  const achievements = [
    {
      icon: FiAward,
      title: 'Royal Food Critics Guild',
      description: 'Certified Master Critic',
      year: '2019'
    },
    {
      icon: FiStar,
      title: 'Culinary Excellence Award',
      description: 'Outstanding Food Journalism',
      year: '2021'
    },
    {
      icon: FiHeart,
      title: 'Community Choice Award',
      description: 'Most Trusted Local Critic',
      year: '2022'
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-purple-900 mb-4 font-cinzel">
            The Royal Critic
          </h1>
          <div className="w-32 h-1 bg-amber-400 mx-auto mb-8"></div>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-16 border border-purple-100"
        >
          <div className="bg-gradient-to-r from-purple-900 to-indigo-900 px-8 py-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 bg-amber-400 rounded-full flex items-center justify-center shadow-2xl">
                <SafeIcon icon={FiAward} className="h-16 w-16 text-purple-900" />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-4xl font-bold text-amber-400 mb-2 font-cinzel">
                  Sir Edmund Tastington III
                </h2>
                <p className="text-xl text-purple-200 mb-4 font-crimson">
                  Royal Food Critic & Culinary Knight
                </p>
                <div className="flex items-center justify-center md:justify-start text-purple-200">
                  <SafeIcon icon={FiMapPin} className="h-5 w-5 mr-2" />
                  <span className="font-crimson">Kingdom of Gastronomy</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="prose prose-lg max-w-none font-crimson text-gray-700 leading-relaxed">
              <p className="text-xl mb-6">
                Greetings, noble food enthusiasts! I am Sir Edmund Tastington III, 
                your humble servant in the noble quest for culinary excellence.
              </p>
              
              <p className="mb-6">
                For over five years, I have dedicated my life to the sacred art of 
                food criticism, traveling throughout our fair kingdom to discover 
                and chronicle the finest dining establishments. My palate has been 
                trained in the royal courts, and my standards are as high as the 
                castle towers themselves.
              </p>

              <p className="mb-6">
                Each review is conducted with the utmost care and attention to detail, 
                considering not only the flavors that dance upon the tongue, but also 
                the atmosphere, service, and overall experience that makes dining a 
                truly royal affair.
              </p>

              <p>
                Join me on this noble quest as we explore the culinary treasures 
                hidden throughout our realm, from the grandest banquet halls to 
                the most charming taverns.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-purple-900 mb-8 text-center font-cinzel">
            Royal Achievements
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-xl border border-purple-100 text-center hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={achievement.icon} className="h-8 w-8 text-purple-900" />
                </div>
                <h4 className="text-xl font-bold text-purple-900 mb-2 font-cinzel">
                  {achievement.title}
                </h4>
                <p className="text-gray-600 mb-2 font-crimson">
                  {achievement.description}
                </p>
                <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {achievement.year}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-3xl p-8 text-center"
        >
          <h3 className="text-3xl font-bold text-amber-400 mb-6 font-cinzel">
            Send Royal Correspondence
          </h3>
          <p className="text-purple-200 mb-8 font-crimson text-lg">
            Have a restaurant recommendation or wish to invite me for a royal feast? 
            I would be honored to hear from you!
          </p>
          
          <div className="flex justify-center space-x-6">
            {[
              { icon: FiMail, label: 'Royal Mail', href: 'mailto:sir.edmund@royalpalate.com' },
              { icon: FiTwitter, label: 'Royal Tweets', href: '#' },
              { icon: FiInstagram, label: 'Royal Gallery', href: '#' }
            ].map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                className="flex items-center space-x-2 bg-amber-400 text-purple-900 px-6 py-3 rounded-lg font-cinzel font-semibold hover:bg-amber-300 transition-colors duration-300"
              >
                <SafeIcon icon={contact.icon} className="h-5 w-5" />
                <span className="hidden sm:inline">{contact.label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;