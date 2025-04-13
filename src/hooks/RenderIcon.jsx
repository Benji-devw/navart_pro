// Fonction pour rendre l'icône en fonction de son type (Devicon ou image personnalisée)
const RenderIcon = (data, size, className) => {
  if (data && data.endsWith('.png')) {
    return <img src={data} alt={data} className={className} tabIndex="0" style={{ width: size, height: size }} />;
  } else {
    return <i className={data} tabIndex="0" style={{ fontSize: size }}></i>;
  }
};

export default RenderIcon;
