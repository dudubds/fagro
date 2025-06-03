// src/lib/supabase.ts
import 'react-native-url-polyfill/auto';
import {
  createClient,
  User,
  AuthError,
  PostgrestError, // <--- Adicionar PostgrestError
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
  Session // <--- Adicionar Session
} from '@supabase/supabase-js';
import { Alert } from 'react-native';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;


if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is missing. Check your .env file.");
  Alert.alert("Erro de Configuração", "As credenciais do Supabase não foram encontradas. O aplicativo pode não funcionar corretamente.");
}

export const supabase = createClient(supabaseUrl || "DEFAULT_URL", supabaseAnonKey || "DEFAULT_KEY", {
  auth: {
    // autoRefreshToken: true,
    // persistSession: true,
    // detectSessionInUrl: false,
  },
});

// Definir um tipo para a resposta das funções de autenticação para clareza
interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: AuthError | PostgrestError | null; // Erro pode ser de Auth OU de Postgrest (banco de dados)
}

/**
 * Cadastra um novo usuário utilizando email e senha.
 */
export const signUpUser = async (
  credentials: SignUpWithPasswordCredentials,
  profileData?: Record<string, any>
): Promise<AuthResponse> => { // Usar o tipo de resposta definido
  const { data: authData, error: authError } = await supabase.auth.signUp(credentials);

  if (authError) {
    return { user: null, session: null, error: authError };
  }
  // É importante verificar tanto user quanto session.
  if (!authData.user || !authData.session) {
    return { user: null, session: null, error: new AuthError('Usuário ou sessão não retornados após o cadastro.') };
  }

  if (profileData) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({ id: authData.user.id, ...profileData });

    if (profileError) {
      console.error("Erro ao criar perfil:", profileError);
      // Agora profileError é do tipo PostgrestError. Não é necessário o "as AuthError".
      return { user: authData.user, session: authData.session, error: profileError };
    }
  }

  return { user: authData.user, session: authData.session, error: null };
};

/**
 * Realiza o login do usuário com email e senha.
 */
export const signInUser = async (credentials: SignInWithPasswordCredentials): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.signInWithPassword(credentials);
  return { user: data?.user ?? null, session: data?.session ?? null, error };
};

/**
 * Realiza o logout do usuário.
 */
export const signOutUser = async (): Promise<{ error: AuthError | null }> => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

/**
 * Obtém o usuário atualmente logado.
 */
export const getCurrentUser = async (): Promise<User | null> => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Erro ao obter sessão:", error);
    return null;
  }
  return session?.user ?? null;
};

/**
 * Escuta as mudanças no estado de autenticação.
 */
export const onAuthStateChange = (
  callback: (event: string, session: Session | null) => void
) => {
  const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
    // O primeiro parâmetro é o evento, o segundo é a sessão.
    // A biblioteca @supabase/supabase-js já passa os tipos corretos para o callback.
    callback(_event, session);
  });
  return authListener;
};

// Exportar os tipos pode ser útil
export type { User, AuthError, PostgrestError, Session };