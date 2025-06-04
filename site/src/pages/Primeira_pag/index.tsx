import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <Text style={styles.logo}>iPet</Text>
        <View style={styles.menu}>
          <Text style={styles.menuItem}>Início</Text>
          <Text style={styles.menuItem}>Feed</Text>
          <Text style={styles.menuItem}>Marketplace</Text>
          <Text style={styles.menuItem}>Clínicas</Text>
          <Text style={styles.menuItem}>Perfil</Text>
        </View>
        <View style={styles.authButtons}>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginText}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.signupText}>Cadastrar-se</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Conteúdo */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Boas-vindas */}
        <View style={styles.welcome}>
          <Text style={styles.title}>
            Bem-vindo ao <Text style={styles.titleBlue}>iPet</Text>
          </Text>
          <Text style={styles.subtitle}>
            Sua rede social para amantes de animais!
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Comece Agora</Text>
          </TouchableOpacity>
        </View>

        {/* Conteúdo Principal */}
        <View style={styles.main}>
          {/* Últimas Postagens */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Últimas Postagens</Text>
            <View style={styles.card}>
              <Text style={styles.user}>@maria_petlover</Text>
              <Text>Conheçam a Luna, minha nova filhote!</Text>
              <View style={styles.imagePlaceholder}>
                <Text>[Imagem]</Text>
              </View>
            </View>
          </View>

          {/* Marketplace e Clínicas */}
          <View style={styles.side}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Marketplace</Text>
              <View style={styles.card}>
                <Text>Ração Premium 10% OFF</Text>
              </View>
              <View style={styles.card}>
                <Text>Brinquedos novos</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Clínicas Recomendadas</Text>
              <View style={styles.card}>
                <Text>Clínica PetVida</Text>
              </View>
              <View style={styles.card}>
                <Text>Vet Saúde 24h</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Rodapé */}
        <View style={styles.footer}>
          <Text>© 2025 iPet. Todos os direitos reservados.</Text>
          <Text>Sobre · Termos · Privacidade · Contato</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navbar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#d1d5db',
  },
  logo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2563eb',
  },
  menu: {
    flexDirection: 'row',
  },
  menuItem: {
    fontSize: 16,
    color: '#374151',
    marginHorizontal: 8,
  },
  authButtons: {
    flexDirection: 'row',
  },
  loginButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 8,
  },
  loginText: {
    color: '#fff',
    fontWeight: '600',
  },
  signupButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  signupText: {
    color: '#fff',
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  welcome: {
    backgroundColor: '#e8f0fe',
    padding: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  titleBlue: {
    color: '#2563eb',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  section: {
    flex: 1,
    minWidth: '48%',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    elevation: 1,
  },
  user: {
    fontWeight: '700',
    marginBottom: 4,
  },
  imagePlaceholder: {
    backgroundColor: '#d1d5db',
    height: 100,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  side: {
    flex: 1,
    minWidth: '48%',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
