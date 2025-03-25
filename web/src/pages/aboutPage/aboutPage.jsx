import bulbSkills from '../../assets/bulb.png'


function AboutPage() {
    return (
      <div className="about-page" style={{ display: 'flex', alignItems: 'center', padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
        {/* Imagen en el lateral izquierdo */}
        <div style={{ flex: '1', paddingRight: '20px' }}>
          <img 
            src={bulbSkills} 
            alt="Colaboración y aprendizaje" 
            style={{ width: '100%', borderRadius: '10px' }}
          />
        </div>
  
        {/* Texto en el lateral derecho */}
        <div style={{ flex: '1' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '60px',fontWeight: 'bold', }}>Sobre Nosotros</h1>
          <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
            Somos una plataforma para intercambiar habilidades. Ya seas un experto en tecnología, diseño, idiomas, o cualquier otra área, esta plataforma te permite compartir tus habilidades con otros, aprender nuevas y formar conexiones valiosas.
          </p>
          <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          Únete a nosotros y empieza a compartir tus habilidades, aprender de otros y expandir tus horizontes. <strong>¡El conocimiento nunca ha estado tan cerca de ti!</strong>
          </p>
        </div>
      </div>
    );
  }
  
  export default AboutPage;

