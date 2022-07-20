import React from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '1500px',
  height: '700px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBe8rLZVCkv_rXFtYPHXGCEHjE6EIP69Rw"
  })

  const [map, setMap] = React.useState(/** @type google.maps.Map */ (null))

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
    <Box position='absolute' left={0} top={0}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
        <Marker position={center} />
      </GoogleMap>
      </Box>
       <Box
        position='absolute'
        p={4}
        borderRadius='lg'
        mt={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='modal'
        >
        <HStack spacing={4}>
          <Input type='text' placeholder='Origin' />
          <Input type='text' placeholder='Destination' />
          <ButtonGroup>
            <Button colorScheme='pink' type='submit'>
              Calculate Route
            </Button>
            <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              onClick={() => map.panTo(center)}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <Text>Distance: </Text>
          <Text>Duration: </Text>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => map.panTo(center)}
          />
        </HStack>
      </Box>
      </Flex>
  ) : <></>
}






// import React, {useState} from 'react'
// import {
//   Box,
//   Button,
//   ButtonGroup,
//   Flex,
//   HStack,
//   IconButton,
//   Input,
//   SkeletonText,
//   Text,
// } from '@chakra-ui/react'
// import { FaLocationArrow, FaTimes } from 'react-icons/fa'

// import {useJsApiLoader,GoogleMap,Marker} from '@react-google-maps/api'

// // import { keyframes } from '@emotion/core'


// const center = {lat: 48.8584.toFixed, lng: 2.2945}

// const Map = () => {
  
  
//   const {isLoaded} = useJsApiLoader({
//     googleMapsApiKey: "process.env.REACT_APP_GOOGLE_MAP_API_KEY",
//   })
//   const [map, setMap] = useState(/** @type google.maps.GoogleMap */ null)

//   if(!isLoaded)
//   {
//     return <SkeletonText />
//   }

//   return (
//     <>
//     <Flex
//       position='relative'
//       flexDirection='column'
//       alignItems='center'
//       h='100vh'
//       w='100vw'
//     >
//       <Box position='absolute' left={0} top={0}>
//         {/* Google map box */}
//         <GoogleMap 
//         center={center} 
//         zoom={15} 
//         mapContainerStyle={{width: '100%', height:'100%'}}
//         onLoad={(map)=>setMap(map)}
//         >
//           {/* Displagin markers, or direction */}
//           <Marker position={center} />
//         </GoogleMap>
//       </Box>

//       <Box
//         p={4}
//         borderRadius='lg'
//         mt={4}
//         bgColor='white'
//         shadow='base'
//         minW='container.md'
//         zIndex='modal'
//       >
//         <HStack spacing={4}>
//           <Input type='text' placeholder='Origin' />
//           <Input type='text' placeholder='Destination' />
//           <ButtonGroup>
//             <Button colorScheme='pink' type='submit'>
//               Calculate Route
//             </Button>
//             <IconButton
//               aria-label='center back'
//               icon={<FaTimes />}
//               onClick={() => alert(123)}
//             />
//           </ButtonGroup>
//         </HStack>
//         <HStack spacing={4} mt={4} justifyContent='space-between'>
//           <Text>Distance: </Text>
//           <Text>Duration: </Text>
//           <IconButton
//             aria-label='center back'
//             icon={<FaLocationArrow />}
//             isRound
//             onClick={() => map.panTo(center)}
//           />
//         </HStack>
//       </Box>
//     </Flex>
//     </>
//   )
// }

export default Map

// // AIzaSyBe8rLZVCkv_rXFtYPHXGCEHjE6EIP69Rw