
export const generateAvatarFromEmail = (email: string): string => {
  const firstLetter = email.charAt(0).toUpperCase();
  
  //MR STANLEY OUR COLOR VARIABLEs CANNOT BE USED HERE WE NEED RANDOM COLORS
  const colors = [
    "#2988CC",
    "#FAB403",
    "#29953E", 
    "#CC0E11",
    "#6772A7",
    "#E67E22", 
    "#9B59B6",
    "#1ABC9C", 
  ];
  
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colorIndex = Math.abs(hash) % colors.length;
  const backgroundColor = colors[colorIndex];
  
  const svg = `
    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="${backgroundColor}"/>
      <text x="20" y="20" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="white" text-anchor="middle" dominant-baseline="central">${firstLetter}</text>
    </svg>
  `.trim();
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

