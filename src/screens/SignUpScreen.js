import React, { useState } from 'react';
import { VStack, Input, Button, Checkbox, Text, Link } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const navigation = useNavigation();

    return (
        <VStack space={4} alignItems="center" justifyContent="center" mt="10%">
            <Text fontSize="xl" bold>Sign Up</Text>
            <Text>Welcome,</Text>
            <Input
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
                w="75%"
                mt="2"
            />
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
            <Input
                placeholder="Re-Password"
                value={rePassword}
                onChangeText={setRePassword}
                type="password"
                w="75%"
                mt="2"
            />
            <Checkbox value="agree-terms">
                I agree to the Terms & Conditions and Privacy Policy
            </Checkbox>
            <Button w="75%" mt="2" bg="primary.500">Sign Up</Button>
            <Link onPress={() => navigation.navigate('Login')}>
                Have an account? Login
            </Link>
        </VStack>
    );
};

export default SignUpScreen;
