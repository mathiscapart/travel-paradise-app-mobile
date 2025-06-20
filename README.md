# 📱 Travel Paradise – App Mobile

Application mobile pour les **guides touristiques**, développée avec **React Native** et **Expo Router**.

## 🚀 Fonctionnalités

- 🔐 Authentification JWT
- ✅ Contrôle de rôle (guides uniquement, rôle `30`)
- 📆 Visualisation des visites
- 🧍‍♂️ Profil utilisateur
- 🌐 Navigation tabulée (Expo Router)
- 📊 Graphiques intégrés (react-native-chart-kit)

---

## 🧱 Stack technique

- **React Native 0.79.2**
- **Expo SDK 53**
- **React 19**
- **TypeScript**
- **expo-router 5**
- **AsyncStorage**
- **Haptics & animations**
- **WebView + ChartKit + SVG**

---

## 📁 Arborescence principale

````
app/
├── (tabs)/ # Navigation par onglets
│ ├── login.tsx # Page de connexion
│ ├── dashboard.tsx # Vue principale
│ ├── profil.tsx # Page de profil
│ └── visite/[id].tsx # Détail d'une visite
├── +not-found.tsx
└── _layout.tsx

components/
├── PrimaryButton.tsx, Card.tsx, Logo.tsx, etc.
├── ui/ # Composants spécifiques à iOS

services/
├── authService.tsx # Login / logout
└── userService.tsx # Récupération de l'utilisateur

hooks/
├── useAuth.tsx # Contexte d’authentification
└── useUser.tsx

assets/
├── data/visites.json # Données statiques pour dev
├── fonts/ # BeVietnamPro
└── images/ # Logos, splash, icônes
````

---

## 🔐 Authentification

La connexion est disponible uniquement pour les utilisateurs ayant le **rôle `30`** (guide). Si le rôle est incorrect :

- Le token est supprimé
- L’utilisateur est redirigé vers la page de login

```ts
if (userData.role !== 30) {
  await authService.logout();
  throw new Error("Accès non autorisé pour ce rôle");
}
```
## ⚙️ Installation & lancement

### Prérequis
- Node.js ≥ 18
- Expo CLI (npm install -g expo-cli)
```
cd travelparadise
npm install
npm start
```
