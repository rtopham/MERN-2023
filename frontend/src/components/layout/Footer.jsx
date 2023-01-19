import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

const Footer = () => {
  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      variant='dark'
      bg='dark'
      fixed='bottom'
    >
      <Container style={{ width: '600px' }}>
        <Navbar.Text>
          MongoDB | Express | React | NodeJS | Redux | Redux Toolkit | RTK Query
        </Navbar.Text>
      </Container>
    </Navbar>
  )
}

export default Footer
