/* Edit this file to make the portfolio your own. No build or installation needed. */
window.PORTFOLIO = {
  name: 'Nitesh',
  github: 'https://github.com/Nitesh-Datascience',
  title: 'Nitesh — A Garden of Insights',
  projects: [
    {
      id: 'edupro', title: 'EduPro', subtitle: 'Personalized learning, rooted in data.',
      category: 'machine-learning', label: 'Learner segmentation', color: 'gold',
      x: 50.4, y: 19.6, number: '01', art: 'learning',
      url: 'https://eduproproject-jkoe6q6tctk5xafa6ggogf.streamlit.app/',
      tags: ['Python', 'Machine learning', 'Streamlit'],
      description: 'An exploration of student segmentation and personalized course recommendations. The project looks at how different learner profiles can support more relevant learning journeys.',
      question: 'How can we move beyond one-size-fits-all course recommendations?',
      approach: ['Explore learner behavior and identify useful patterns.', 'Group learners by shared characteristics.', 'Connect learner segments with relevant course recommendations.']
    },
    {
      id: 'fraud', title: 'Financial Fraud Detection', subtitle: 'Finding the signal in unusual activity.',
      category: 'machine-learning', label: 'Fraud detection', color: 'coral',
      x: 41.5, y: 34.5, number: '02', art: 'fraud',
      url: 'https://financialfrauddetection-6geni2xkrt3dc8ry2infsf.streamlit.app/',
      tags: ['Python', 'Machine learning', 'Streamlit'],
      description: 'A financial analytics project centered on detecting potentially fraudulent transactions. It brings transaction patterns and model exploration into an accessible dashboard.',
      question: 'How can transaction data help reveal suspicious patterns?',
      approach: ['Inspect and prepare transaction data.', 'Explore classification methods for suspicious activity.', 'Present patterns and model outputs in a dashboard.']
    },
    {
      id: 'churn', title: 'Customer Churn Prediction', subtitle: 'Understanding the reasons people leave.',
      category: 'machine-learning', label: 'Customer churn', color: 'blue',
      x: 59.0, y: 40.5, number: '03', art: 'churn',
      url: 'https://customerchurnprediction-fkpbjib3muyvrhmgchkurb.streamlit.app/',
      tags: ['Python', 'Predictive analytics', 'Streamlit'],
      description: 'A customer analytics project exploring churn prediction. It uses customer data to investigate retention questions and make predictive outputs easier to explore.',
      question: 'What can customer behavior tell us about the risk of churn?',
      approach: ['Explore customer attributes and behavior.', 'Investigate predictive patterns related to churn.', 'Make the analysis approachable through an interactive app.']
    },
    {
      id: 'care', title: 'Care Transition Analytics', subtitle: 'A clearer view of the care journey.',
      category: 'analytics', label: 'Care analytics', color: 'green',
      x: 61.5, y: 55.0, number: '04', art: 'care',
      url: 'https://care-transition-efficiency-analytics-knfy8ljtaxyn8ti74zy5ng.streamlit.app/',
      tags: ['Data analytics', 'Visualization', 'Streamlit'],
      description: 'An analytics project focused on care transition efficiency. The dashboard provides a place to explore care journey data and the questions that arise around transitions.',
      question: 'How can a dashboard make care transitions easier to understand?',
      approach: ['Organize care transition data for analysis.', 'Explore efficiency patterns across the care journey.', 'Present findings through a visual dashboard.']
    }
  ]
};
