import Task from "@/model/Task";
import { completeTask, getCompletedTasks, getInProgressTasks, getToDoTasks, initializeTasks } from "@/modules/taskManager";
import { Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon, Close as CloseIcon } from "@mui/icons-material";
import { AppBar, Badge, Button, Container, Grid, IconButton, ListItem, ListItemText, Paper, Snackbar, Toolbar, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

interface TaskFormValues {
  title: string;
  description: string;
  persona: string;
  group: number;
}

export default function Home() {
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [toDoTasks, setToDoTasks] = useState<Task[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState<TaskFormValues>({ title: '', description: '', persona: '', group: 0 });
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });
  const [darkMode, setDarkMode] = useState(false);

  const theme = useTheme();


  useEffect(() => {
    initializeTasks();
    updateTaskLists();
  }, []);

  const updateTaskLists = () => {
    try {
      const inProgress = getInProgressTasks();
      const completed = getCompletedTasks();
      const toDo = getToDoTasks();

      setActiveTasks(inProgress);
      setCompletedTasks(completed);
      setToDoTasks(toDo);
    } catch (error) {
      console.error("Error updating task lists:", error);
    }
  };




  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues(prevValues => ({ ...prevValues, [name]: value }));
  };

  const handleCompleteTask = (taskTitle: string) => {
    try {
      completeTask(taskTitle);
      updateTaskLists();
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Check if task's complete button should be disabled
  const isTaskCompleteDisabled = (task: Task) => {
    return !task.active;
  };

  // Function to group tasks by their 'group' property
  const groupTasksByGroup = (tasks: Task[]) => {
    const groupedTasks: { [key: number]: Task[] } = {};
    tasks.forEach((task) => {
      if (!groupedTasks[task.group]) {
        groupedTasks[task.group] = [];
      }
      groupedTasks[task.group].push(task);
    });
    return groupedTasks;
  };

  return (
    <Paper style={{ height: '100vh', backgroundColor: darkMode ? '#121212' : '#fafafa', color: darkMode ? '#e0e0e0' : '#000' }}>
      <AppBar position="static" color={darkMode ? 'primary' : 'default'}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>Task Board</Typography>
          <IconButton edge="end" color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: "2rem" ,width:"100vw"}}>
        <Grid container spacing={3}>
          {/* To Do Column */}
          <Grid item xs={12} md={4}>
            <Typography variant="h4" gutterBottom>
              To Do <Badge badgeContent={toDoTasks.length} color="primary" />
            </Typography>
            <Grid container spacing={2}>
              {Object.entries(groupTasksByGroup(toDoTasks)).map(([group, tasks]) => (
                <Grid container spacing={2} key={group}>
                  {tasks.map((task) => (
                    <Grid item xs={12} sm={6} key={task.id} style={{ width: "100%", marginTop: "1rem" }}>
                      <ListItem style={{ background: darkMode ? '#333' : '#f5f5f5', padding: 16, borderRadius: 4 }}>
                        <ListItemText primary={task.title} secondary={task.description} />
                      </ListItem>
                    </Grid>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* In Progress Column */}
          <Grid item xs={12} md={4}>
            <Typography variant="h4" gutterBottom>
              In Progress <Badge badgeContent={activeTasks.length} color="secondary" />
            </Typography>
            <Grid container spacing={2}>
              {Object.entries(groupTasksByGroup(activeTasks)).map(([group, tasks]) => (
                <Grid container spacing={2} key={group}>
                  {tasks.map((task) => (
                    <Grid item xs={12} sm={6} key={task.id} style={{ width: "100%", marginTop: "1.2rem" }}>
                      <ListItem
                        style={{ background: darkMode ? '#444' : '#f5f5f5', padding: 16, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                      >
                        <ListItemText primary={task.title} secondary={task.description} />
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleCompleteTask(task.title)}
                          disabled={isTaskCompleteDisabled(task)}
                          style={{ height: "2rem", marginLeft: '16px' }}
                        >
                          Done
                        </Button>
                      </ListItem>
                    </Grid>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Completed Column */}
          <Grid item xs={12} md={4}>
            <Typography variant="h4" gutterBottom>
              Completed <Badge badgeContent={completedTasks.length} color="success" />
            </Typography>
            <Grid container spacing={2}>
              {Object.entries(groupTasksByGroup(completedTasks)).map(([group, tasks]) => (
                <Grid container spacing={2} key={group}>
                  {tasks.map((task) => (
                    <Grid item xs={12} sm={6} key={task.id} style={{ width: "100%", marginTop: "1rem" }}>
                      <ListItem style={{ background: darkMode ? '#333' : '#f5f5f5', padding: 16, borderRadius: 4 }}>
                        <ListItemText primary={task.title} secondary={task.description} />
                      </ListItem>
                    </Grid>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>


        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          message={notification.message}
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseNotification}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Container>
    </Paper>)}