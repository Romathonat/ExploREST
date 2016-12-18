//the list of servers we can access
const serverPaths = [
  'http://pokeapi.co/api/v2'
]

//the adress used internally in the application to proxy
const proxyURL = '/proxy';

//the adress of the initial backend Server
const backendURL = serverPaths[0];

const initialState =  {
  currentPath: '/',
  currentJson: {},
  errorMessage: {
    simple: '',
    detailed: ''
  },
  okMessage: '',
  currentURLServer: backendURL,
  // readings (toolified), or write (edit)
  codeRights: 'read'
};

module.exports = {initialState: initialState, proxyURL: proxyURL, backendURL: backendURL, serverPaths: serverPaths};
