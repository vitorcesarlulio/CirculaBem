import React, { useState } from 'react';
import { VStack, Input, Button, Checkbox, Icon, Text, Link, Divider } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  return (
    <VStack space={4} alignItems="center" justifyContent="center" mt="10%">
      <Text fontSize="xl" bold>Login</Text>
      <Text>Welcome back,</Text>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        w="75%"
        mt="2"
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        type="password"
        w="75%"
        mt="2"
      />
      <Checkbox value="remember-me" colorScheme="blue">
        Remember me
      </Checkbox>
      <Link _text={{ fontSize: "sm" }} alignSelf="flex-end" mr="12%">
        Forgot account?
      </Link>
      <Button w="75%" mt="2" colorScheme="blue">Login</Button>
      <Divider my="2" w="75%" />
      <Button w="75%" leftIcon={<Icon as={MaterialIcons} name="google" size="sm" />} colorScheme="red">
        Continue with Google
      </Button>
      <Button w="75%" leftIcon={<Icon as={MaterialIcons} name="apple" size="sm" />} colorScheme="dark">
        Continue with Apple
      </Button>
      <Link onPress={() => navigation.navigate('SignUp')}>
        Don't have an account? Sign up
      </Link>
    </VStack>
  );
};

export default LoginScreen;
