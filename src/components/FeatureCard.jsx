import React from 'react';

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <div 
      className="glass-card p-6 rounded-2xl hover:scale-105 transition-all duration-300 group animate-float animate-fadeInUp"
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: 'both'
      }}
    >
      <div className="flex items-start gap-4">
        <div className="glass p-3 rounded-xl group-hover:scale-110 transition-transform duration-200">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-foreground/80 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
