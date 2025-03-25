import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../../assets/default-avatar.jpg'
import { Container, Row, Col, Card, Button, Form, Image } from 'react-bootstrap';
import styles from './homePage.module.css'
import * as skillAppi from "../../services/api-service";
const HomePage = () => {
  const navigate = useNavigate();
  const usersData = []

  const [users, setUsers] = useState(usersData);
  const [searchSkills, setSearchSkills] = useState('');
  const [location, setLocation] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(usersData);

  useEffect(() => {
    skillAppi.skillList()
      .then((skills) => setUsers(skills))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const filtered = users.filter(user => {
      const hasSkillMatch = user.skills.some(skill =>
        skill.toLowerCase().includes(searchSkills.toLowerCase())
      );
      const isLocationMatch = user.location.toLowerCase().includes(location.toLowerCase());
      return hasSkillMatch && isLocationMatch;
    });

    setFilteredUsers(filtered);
  }, [searchSkills, location, users]);

  const handleViewProfile = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <Container>
      <h1 className={styles.pageTitle}>¡Bienvenido a Skill Swap!</h1>

      <Row className={styles.filtersRow}>
        <Col md={4} className={styles.filterCol}>
          <Form.Control
            type="text"
            placeholder="Buscar habilidades"
            value={searchSkills}
            onChange={(e) => setSearchSkills(e.target.value)}
          />
        </Col>
        <Col md={4} className={styles.filterCol}>
          <Form.Control
            type="text"
            placeholder="Buscar por ubicación"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Col>
      </Row>

      <Row className={styles.cardContainer}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <Col key={user.id} md={4} className={styles.cardCol}>
              <Card className={styles.card}>
                <Card.Body className={styles.cardBody}>
                  <Image
                    src={user.photoUrl || defaultAvatar}
                    alt={user.name}
                    roundedCircle
                    width={50}
                    height={50}
                    className={styles.cardImage}
                  />
                  <div>
                  <Card.Title className={styles.cardTitle}>{user.name}</Card.Title>
                  <Card.Text className={styles.cardText}>
                    <strong>Habilidades:</strong> {user.skills.join(', ')}
                  </Card.Text>
                  <Card.Text className={styles.cardText}>
                    <strong>Ubicación:</strong> {user.location}
                  </Card.Text>
                  <Button variant="primary" onClick={() => handleViewProfile(user.id)}>
                    Ver Perfil
                  </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>No se encontraron usuarios que coincidan con tus filtros.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default HomePage;
