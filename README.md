
# 🚀 Dearn Protocol

Dearn protocol is a crosschain asset management platform built on the Internet Computer. It allows users to invest, track and manage their assets across the different platforms all in one place. 


## 🔧 Technical 

The application consists of mainly three canisters.
- **Frontend**: Displays the UI that allows the user to interact with the application
- **Backend** : Responsible for creating and managing `Portals` for the users.

- **Portal** : A new portal is created for each new user that joins the platform
    - The portal is a dedicated smart contract that is fully under the control of the user. It is like a command center that allows the user to manage their assets. 

    - The portal houses all the required functionality and intergation to the different platforms and networks. This allows the user to invest in assets from the different platforms and networks without the need for manually visiting the platforms. All that can be done within the portal. An example, here is that the user can provide liquidity on a pair on ICPSwap all in the Portal without ever visiting the ICPSwap website.


## ✨ Features
- Crosschain integration
- Cross platform integration
- 


## 🛠 Technology Stack
- Backend(Motoko) 
- Frontend(React)
- Authentication(IdentityKit)

## 🚀 Getting Started
Ensure that you have node and dfx installed on your machine
1. Clone the repository
```bash
git clone https://github.com/Protocol
cd Protocol
```
2. Install the dependencies

```bash
npm install
```
3. Deploy the canisters
````bash
dfx deploy 
````

4. start the server

````bash
npm start
````

## 📋 To Do
- Advanced Analytics for the user
- Crosschain asset management
- 



## ⚠️ Disclaimer
This project is still in its early stages of development, Interact with caution.
