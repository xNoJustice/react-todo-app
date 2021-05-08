import React, { Component } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
  Button,
  FormControlLabel,
  Fab,
  AppBar,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import { Done, Edit, Delete } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import DoneIcon from "@material-ui/icons/Done";
export default class Todo extends Component {
  constructor() {
    super();

    this.state = {
      todos: [
        {
          id: 1,
          todo: "Todo1",
          done: false,
        },
        {
          id: 2,
          todo: "Todo2",
          done: false,
        },
        {
          id: 3,
          todo: "Todo3",
          done: false,
        },
        {
          id: 4,
          todo: "Todo4",
          done: false,
        },
      ],
      newTodo: "",
      newId: 5,
      mode: "",
      filteredTodos: [],
      searchQuery: "",
      editTodo: "",
      editTodoId: "",
    };
  }

  componentDidMount() {
    this.handleModeChange();
  }

  handleInputChanged = (event) => {
    this.setState({
      newTodo: event.target.value,
    });
  };

  handleSearchInputChanged = (event) => {
    this.setState({
      searchQuery: event.target.value,
    });
    this.handleModeChange("search");
  };

  handleEditInputChanged = (event) => {
    this.setState({
      editTodo: event.target.value,
    });
  };

  create = () => {
    this.setState((state) => {
      if (this.state.newTodo.length > 255) return;
      let todos = [
        ...state.todos,
        { id: state.newId, todo: state.newTodo, done: false },
      ];
      this.handleModeChange();
      return {
        todos,
        newTodo: "",
        newId: state.newId + 1,
      };
    });
  };

  cancelSearch = () => {
    this.setState({
      searchQuery: "",
      mode: "",
    });
    this.handleModeChange();
  };

  cancelEdit = () => {
    this.setState({
      editTodo: "",
      editTodoId: "",
    });
  };

  edit = (id) => {
    this.setState((state) => {
      let todos = [...state.todos];
      let todoIndex = todos.findIndex((t) => t.id === id);
      let editTodo = todos[todoIndex].todo;
      let editTodoId = todos[todoIndex].id;
      this.handleModeChange();
      return {
        todos,
        editTodo,
        editTodoId,
      };
    });
  };

  update = (id) => {
    this.setState((state) => {
      if (this.state.editTodo.length > 255) return;
      let todos = [...state.todos];
      todos = state.todos.map((todo) => {
        if (todo.id === id) {
          let updatedTodo = {
            ...todo,
            todo: state.editTodo,
          };
          return updatedTodo;
        }
        return todo;
      });
      this.handleModeChange();
      return {
        todos,
        editTodo: "",
        editTodoId: "",
        mode: "",
      };
    });
  };

  complete = (id) => {
    this.setState((state) => {
      let todos = [...state.todos];
      todos = state.todos.map((todo) => {
        if (todo.id === id) {
          let updatedTodo = {
            ...todo,
            done: !todo.done,
          };
          return updatedTodo;
        }
        return todo;
      });
      this.handleModeChange();
      return {
        todos,
      };
    });
  };

  remove = (id) => {
    this.setState((state) => {
      let todos = [...state.todos];

      let todoIndex = todos.findIndex((t) => t.id === id);
      if (todoIndex < 0) return;
      todos.splice(todoIndex, 1);
      this.handleModeChange();
      return {
        todos,
      };
    });
  };

  clear = () => {
    this.setState((state) => {
      let todos = [...state.todos];

      todos.map((todo, index) =>
        todo.done === true ? todos.splice(index, 1) : ""
      );
      this.handleModeChange();
      return {
        todos,
      };
    });
  };

  handleModeChange = (e) => {
    this.setState((state) => {
      let todos = [...state.todos];
      let filteredTodos = [...state.filteredTodos];
      let event = this.state.event ? this.state.event : e;

      switch (event) {
        case "search":
          filteredTodos = todos.filter((x) =>
            x.todo.includes(state.searchQuery)
          );
          break;
        case "completed":
          filteredTodos = todos.filter((todo) => todo.done === true);
          break;
        case "active":
          filteredTodos = todos.filter((todo) => todo.done === false);
          break;
        default:
          filteredTodos = todos;
      }
      return {
        filteredTodos,
        mode: event,
      };
    });
  };

  render() {
    let todos = this.state.filteredTodos
      ? this.state.filteredTodos
      : this.state.todos;

    let activeTodoCount = todos.reduce((count, todo) => {
      return todo.done ? count : count + 1;
    }, 0);

    let completedCount = todos.length - activeTodoCount;

    return (
      <>
        <Container maxWidth="md">
          <Box m={2} pt={5} style={{ paddingBottom: "150px" }}>
            <Typography variant="h3" align="center" margin={5}>
              Welcome to Todo APP
            </Typography>
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="stretch"
            >
              <Typography component="div">
                <TextField
                  name="newTodo"
                  label="What needs to be done?"
                  color="secondary"
                  multiline
                  value={this.state.newTodo}
                  error={this.state.newTodo.length > 255}
                  helperText={
                    this.state.newTodo.length > 255
                      ? "To do can contain up to 255 characters."
                      : " "
                  }
                  onChange={this.handleInputChanged}
                />
                <Fab
                  size="small"
                  color="secondary"
                  onClick={this.create}
                  disabled={!this.state.newTodo}
                  style={{ marginTop: "12px" }}
                >
                  <AddIcon />
                </Fab>
              </Typography>
              <Typography component="div">
                <TextField
                  name="searchTodo"
                  label="Search Todo"
                  color="secondary"
                  multiline
                  value={this.state.searchQuery}
                  onChange={this.handleSearchInputChanged}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Fab
                  size="small"
                  color="secondary"
                  onClick={this.cancelSearch}
                  disabled={this.state.mode !== "search"}
                  style={{
                    display: this.state.mode !== "search" ? "none" : "",
                    marginTop: "12px",
                  }}
                >
                  <CloseIcon />
                </Fab>
              </Typography>
            </Grid>
            <List>
              {todos.map((todo) => (
                <ListItem key={todo.id} button>
                  <ListItemIcon>
                    <FormControlLabel
                      control={
                        <Checkbox
                          icon={<DoneIcon />}
                          checkedIcon={<DoneIcon />}
                          name=""
                        />
                      }
                      edge="start"
                      tabIndex={-1}
                      checked={todo.done}
                      onClick={() => this.complete(todo.id)}
                    />
                  </ListItemIcon>
                  {this.state.editTodoId === todo.id ? (
                    <TextField
                      name="editTodo"
                      label="Edit Todo"
                      color="secondary"
                      multiline
                      value={this.state.editTodo}
                      error={this.state.editTodo.length > 255}
                      helperText={
                        this.state.editTodo.length > 255
                          ? "To do can contain up to 255 characters."
                          : " "
                      }
                      onChange={this.handleEditInputChanged}
                    />
                  ) : (
                    <ListItemText
                      id={todo.id}
                      style={{
                        textDecoration: todo.done ? "line-through" : "none",
                      }}
                    >
                      {todo.todo}
                    </ListItemText>
                  )}
                  <ListItemSecondaryAction>
                    {this.state.editTodoId === todo.id ? (
                      <>
                        <IconButton
                          onClick={() => this.cancelEdit(todo.id)}
                          edge="end"
                        >
                          <CloseIcon color="secondary" />
                        </IconButton>
                        <IconButton
                          onClick={() => this.update(todo.id)}
                          edge="end"
                        >
                          <Done />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton
                          onClick={() => this.edit(todo.id)}
                          edge="end"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => this.remove(todo.id)}
                          color="secondary"
                          edge="end"
                        >
                          <Delete />
                        </IconButton>
                      </>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>
        </Container>
        <AppBar
          position="fixed"
          style={{
            top: "auto",
            bottom: 0,
            backgroundColor: "transparent",
            boxShadow: "none",
          }}
        >
          <Container maxWidth="md">
            <Toolbar>
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
              >
                <Typography component="span">
                  {activeTodoCount > 1
                    ? activeTodoCount + " todos left"
                    : activeTodoCount + " todo left"}
                </Typography>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => this.handleModeChange()}
                >
                  All
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => this.handleModeChange("active")}
                >
                  Active
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => this.handleModeChange("completed")}
                >
                  Completed
                </Button>
                {completedCount > 0 ? (
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => this.clear()}
                  >
                    Clear Completed
                  </Button>
                ) : (
                  ""
                )}
              </Grid>
            </Toolbar>
          </Container>
        </AppBar>
      </>
    );
  }
}
