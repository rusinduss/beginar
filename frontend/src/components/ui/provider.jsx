import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
})

export function Provider(props) {
  return (
    <ChakraProvider theme={theme}>
      {props.children}
    </ChakraProvider>
  )
}
