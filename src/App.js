
//imports requirement
import { Provider } from "react-redux";
import Navbar from "./components/Navbar";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { store } from "./redux/store";

// App Components
function App() {
  return (
    <Provider store={store}>
<Navbar />
    <TodoForm />
    <hr/ >
    <TodoList />
    </Provider>

  );
}

export default App;
