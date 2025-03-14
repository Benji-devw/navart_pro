// Fonction pour rendre l'icône en fonction de son type (Devicon ou image personnalisée)
const RenderIcon = (data, size) => {
  if (data.isImage) {
    return <img src={data.icon} alt={data.name} className="custom-icon" style={{ width: size, height: size }} />;
  } else {
    return <i className={data.icon} style={{ fontSize: size }}></i>;
  }
};

export default RenderIcon;
