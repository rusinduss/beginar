import React from 'react'
import { Container, Flex, Text, HStack, Button, useColorMode } from '@chakra-ui/react'
import { PlusSquareIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import { CiSquarePlus } from 'react-icons/ci'
//import { useProductStore } from '../../Store/Product'

const NavBar = () => {
  const {colorMode,toggleColorMode}=useColorMode();
 // const {products}=useProductStore();
  return (
    <Container maxW="1140px" px="4px" >
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir={{
          base: 'column',
          sm: 'row',
        }}
      >
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
        >
          <Link to="/">Product Store</Link>
        </Text>

        <HStack spacing={2} alignItems="center">
          <Link to="/createpage">
            <button>
              <PlusSquareIcon />
              <CiSquarePlus />
            </button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode==="light" ? "L":"D"}
          </Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default NavBar
