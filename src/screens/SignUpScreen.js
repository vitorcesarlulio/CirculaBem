import React, { useState } from 'react';
import { VStack, Input, Button, Checkbox, Icon, Text, Link, Box } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const navigation = useNavigation();

    return (
        <VStack space={5} alignItems="center" justifyContent="center" mt="5%" px="5%">
            <Text fontSize="2xl" bold color="coolGray.800">Sign Up</Text>
            <Text fontSize="md" color="coolGray.600">Welcome,</Text>
            <Box w="85%" maxW="300px">
                <Input
                    placeholder="Full Name"
                    value={fullName}
                    onChangeText={setFullName}
                    fontSize="md"
                    py="3"
                    InputLeftElement={<Icon as={MaterialIcons} name="person" size="sm" m="2" color="muted.400" />}
                    w="full"
                />
                <Input
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    fontSize="md"
                    py="3"
                    InputLeftElement={<Icon as={MaterialIcons} name="email" size="sm" m="2" color="muted.400" />}
                    w="full"
                />
                <Input
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    type="password"
                    fontSize="md"
                    py="3"
                    InputLeftElement={<Icon as={MaterialIcons} name="lock" size="sm" m="2" color="muted.400" />}
                    w="full"
                />
                <Input
                    placeholder="Re-Password"
                    value={rePassword}
                    onChangeText={setRePassword}
                    type="password"
                    fontSize="md"
                    py="3"
                    InputLeftElement={<Icon as={MaterialIcons} name="lock" size="sm" m="2" color="muted.400" />}
                    w="full"
                />
                <Checkbox value="agree-terms" colorScheme="blue" _text={{ fontSize: "sm" }} my="2" w="full">
                    I agree to the Terms & Conditions and Privacy Policy
                </Checkbox>
            </Box>
            <Button w="85%" maxW="300px" bg="primary.500" py="3" _text={{ color: "white" }}>Sign Up</Button>
            <Link _text={{ fontSize: "sm", color: "blue.600" }} onPress={() => navigation.navigate('Login')}>
                Have an account? Login
            </Link>
        </VStack>
    );
};

export default SignUpScreen;
