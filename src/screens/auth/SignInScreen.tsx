import React from 'react';
import {
  //   View,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useLoginMutation } from '@store/api/authApi';
import { useAppDispatch } from '@hooks';
import { setTokens } from '@store/slices/authSlice';
import { saveTokens } from '@services/storage';

import { Card, Input, Button } from '@components';
import { colors } from '@theme/index';

const schema = z.object({
  email: z.string(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

const PRIMARY = colors.primary;

type FormData = z.infer<typeof schema>;

export default function SignInScreen() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [login, { isLoading, error }] = useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    // resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try { 
      console.log(data);
      
      const tokens = await login(data).unwrap();
      dispatch(setTokens(tokens));
      await saveTokens(tokens);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Card style={styles.card}>
        <Text style={styles.title}>Welcome back 👋</Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Email"
              placeholder="Your email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Password"
              placeholder="••••••••"
              secureTextEntry
              autoCapitalize="none"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={errors.password?.message}
            />
          )}
        />

        {error && (
          <Text style={styles.error}>
            {(error as any)?.data?.message ?? 'Login failed'}
          </Text>
        )}

        <Button
          title={isLoading ? 'Signing in…' : 'Sign In'}
          onPress={handleSubmit(onSubmit)}
          // disabled={isLoading || !isDirty || !isValid}
        />

        <TouchableOpacity
          style={styles.footer}
          onPress={() => navigation.navigate('SignUp' as never)}
        >
          <Text style={styles.footerText}>
            Don't have an account? <Text style={styles.link}>Register</Text>
          </Text>
        </TouchableOpacity>
      </Card>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: { width: '100%', maxWidth: 400 },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  error: { color: '#ff4d4f', marginBottom: 12, textAlign: 'center' },
  footer: { marginTop: 16, alignItems: 'center' },
  footerText: { color: '#555' },
  link: { color: PRIMARY, fontWeight: '600' },
});
