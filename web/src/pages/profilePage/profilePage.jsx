import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Comments from '../../components/comments';
import Rating from '../../components/rating';
import Avatar from '../../components/avatar';
import defaultAvatar from '../../assets/default-avatar.jpg'
import * as skillApi from "../../services/api-service";

const currentUser = { id: 1, name: 'Juan Pérez', skills: ['JavaScript', 'React'], location: 'Madrid' };

const ProfilePage = () => {

  const [user, setUser] = useState({
    id: 1,
    name: '',
    skills: [],
    location: '',
    photoUrl: defaultAvatar,
    bio: '',
  });

  const [newName, setNewName] = useState(user.name);
  const [newSkills, setNewSkills] = useState(user.skills.join(', '));
  const [originalSkills, setOriginalSkills] = useState(user.skills.join(', '));
  const [newLocation, setNewLocation] = useState(user.location);
  const [newPhotoUrl, setNewPhotoUrl] = useState(user.photoUrl);
  const [newPhotoUrl64, setNewPhotoUrl64] = useState('');

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleSkillsChange = (e) => setNewSkills(e.target.value);
  const handleLocationChange = (e) => setNewLocation(e.target.value);


  useEffect(() => {
    skillApi.profile()
      .then((user) => {
        setUser(user)
        setNewName(user.name);
        setNewSkills(user.skills.join(', '));
        setOriginalSkills(user.skills);
        setNewLocation(user.location);
        setNewPhotoUrl(user.photoUrl);
      })
      .catch((error) => console.log(error.response));
  }, []);



  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        setNewPhotoUrl64(`data:image/png;base64,${base64String}`)
        console.log(base64String)
        setNewPhotoUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {

    try {
      const userdata = {
        "name": newName,
        "city": newLocation,
        "avatar": newPhotoUrl64
      }
      console.log(userdata)
      await skillApi.userUpdate(userdata)
    } catch (error) { console.log(error) }

    const newSk = newSkills.split(',').map(skill => skill.trim())

    const nuevos = newSk.filter(item => !originalSkills.includes(item));
    const eliminados = originalSkills.filter(item => !newSk.includes(item));


    await nuevos.forEach(async (skill) => {
      const newSki = {
        "name": skill,
        "description": "",
        "years_experience": 1
      }
      try {
        await skillApi.skillCreate(newSki)
      } catch (error) { }
    });

    await eliminados.forEach(async (skill) => {
      try {
        await skillApi.skillDelete(skill)
      } catch (error) { }
    });





    setUser({
      name: newName,
      skills: newSkills.split(',').map(skill => skill.trim()),
      location: newLocation,
      photoUrl: newPhotoUrl || user.photoUrl,
    });
    alert('Perfil actualizado');
  };

  return (
    <Container>
      <h1 className="my-4" style={{ textAlign: 'center', fontSize: '3rem', fontWeight: 'bold' }}>
        Mi Perfil
      </h1>

      <Row>
        <Col md={4} className="text-center">

          {/* Foto de perfil */}
          <Avatar src={newPhotoUrl64 || newPhotoUrl} size={150} />

          {/* Rating
          <div className="mt-5 py-5">
            <h5>Valoración media</h5>
            <Rating userId={user.id} currentUserId={currentUser.id} isOwnProfile={true} />
          </div>*/}
        </Col>

        <Col md={8}>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={newName}
                onChange={handleNameChange}
                placeholder="Introduce tu nombre"
              />
            </Form.Group>

            <Form.Group controlId="skills" className="mt-3">
              <Form.Label>Habilidades</Form.Label>
              <Form.Control
                type="text"
                value={newSkills}
                onChange={handleSkillsChange}
                placeholder="Introduce tus habilidades, separadas por coma"
              />
            </Form.Group>

            <Form.Group controlId="location" className="mt-3">
              <Form.Label>Ubicación</Form.Label>
              <Form.Control
                type="text"
                value={newLocation}
                onChange={handleLocationChange}
                placeholder="Introduce tu ubicación"
              />
            </Form.Group>

            <Form.Group controlId="photoFile" className="mt-3">
              <Form.Label>Foto de Perfil</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handlePhotoChange} />
            </Form.Group>

            <Button variant="primary" className="mt-4" onClick={handleSaveProfile}>
              Guardar Cambios
            </Button>
          </Form>
        </Col>
      </Row>

      {/* Sección de comentarios */}
      <Row className="mt-5">
        <Col>
          <Comments user={user} />
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
