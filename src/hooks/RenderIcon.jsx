// Fonction pour rendre l'icône en fonction de son type (Devicon ou image personnalisée)
const RenderIcon = (data, size) => {
  if (data && data.endsWith('.png')) {
    return <img src={data} alt={data} className="custom-icon" style={{ width: size, height: size }} />;
  } else {
    return <i className={data} style={{ fontSize: size }}></i>;
  }
};

export default RenderIcon;
