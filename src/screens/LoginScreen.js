import React, { useState } from 'react';
import { VStack, Input, Button, Checkbox, Icon, Text, Link, Divider, Box } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  return (
    <VStack space={5} alignItems="center" justifyContent="center" mt="5%" px="5%">
      <Text fontSize="2xl" bold color="coolGray.800">Login</Text>
      <Text fontSize="md" color="coolGray.600">Welcome back,</Text>

      <Box w="85%" maxW="300px" mt="2">
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          fontSize="md"
          py="3"
          InputLeftElement={<Icon as={MaterialIcons} name="email" size="sm" m="2" color="muted.400" />}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          type="password"
          fontSize="md"
          py="3"
          InputLeftElement={<Icon as={MaterialIcons} name="lock" size="sm" m="2" color="muted.400" />}
        />
        <Checkbox value="remember-me" colorScheme="blue" _text={{ fontSize: "sm" }} my="2">
          Remember me
        </Checkbox>
        <Link _text={{ fontSize: "sm", color: "blue.500", bold: true }} alignSelf="flex-end" onPress={() => navigation.navigate('ForgotPassword')}>
          Forgot Password?
        </Link>
      </Box>

      <Button w="85%" maxW="300px" bg="primary.500" py="3" _text={{ color: "white" }}>Login</Button>

      <Divider my="3" w="85%" maxW="300px" />

      <Button
        w="85%" maxW="300px"
        leftIcon={<Icon as={MaterialIcons} name="login" size="sm" m="2" color="red.500" />}
        colorScheme="red" variant="outline" py="3">
        Continue with Google
      </Button>

      <Button
        w="85%" maxW="300px"
        leftIcon={<Icon as={MaterialIcons} name="apple" size="sm" m="2" color="muted.700" />}
        colorScheme="dark" variant="outline" py="3">
        Continue with Apple
      </Button>

      <Link _text={{ fontSize: "sm", color: "blue.600" }} onPress={() => navigation.navigate('SignUp')}>
        Don't have an account? Sign up
      </Link>
    </VStack>
  );
};

export default LoginScreen;
