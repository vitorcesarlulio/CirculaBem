import React, { useState } from 'react';
import { VStack, Input, Button, Text, Link, Box, useToast } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const toast = useToast();

  const handleResetPassword = () => {
    // Simulação de envio de link de reset de senha
    if (email) {
      console.log('Reset password link sent to:', email);
      toast.show({
        description: "Reset link sent to your email.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      navigation.goBack(); // Retornar à tela anterior ou redirecionar conforme necessário
    } else {
      toast.show({
        description: "Please enter a valid email address.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack space={4} alignItems="center" justifyContent="center" mt="10%" px="5%">
      <Text fontSize="xl" bold>Reset Your Password</Text>
      <Text>Please enter your email address to receive a link to reset your password.</Text>
      <Box w="85%" maxW="300px">
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          mt="2"
          w="full"
        />
      </Box>
      <Button w="85%" maxW="300px" mt="2" onPress={handleResetPassword} bg="primary.500" _text={{ color: "white" }}>
        Send Reset Link
      </Button>
    </VStack>
  );
};

export default ForgotPasswordScreen;