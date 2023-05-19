import { Box, Button, Divider, Grid, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import CardItem from './Card/CardItem';
import Navbar from './Navbar/Navbar';


export interface User {
  id: number;
  username: string;
  avatar: string;
  rating?: number;
}

const UserRatingSystem = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [positiveUsers, setPositiveUsers] = useState<User[]>([]);
  const [negativeUsers, setNegativeUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [tabValue, setTabValue] = useState<number>(0);

  const fetchUsers = async (nextPage = false) => {
    if (nextPage) {
      setPage(page + 1);
    } else {
      setPage(1);
    }
    const response = await fetch(`https://random-data-api.com/api/users/random_user?size=3&page=${page}`);
    const data: User[] = await response?.json();
    if (nextPage) {
      setUsers([...users, ...data]);
    } else {
      setUsers(data);
    }
  };

  const handlePositiveRating = (user: User) => {
    setPositiveUsers([...positiveUsers, { ...user, rating: 1 }]);
    setUsers(users.filter((u) => u.id !== user.id));
  };

  const handleNegativeRating = (user: User) => {
    setNegativeUsers([...negativeUsers, { ...user, rating: -1 }]);
    setUsers(users.filter((u) => u.id !== user.id));
  };

  const handleRatingChange = (user: User, change: '+' | '-', typeUsers: 'negative' | 'positive') => {
    if (change === '+') {
      if (user.rating === 0 && typeUsers === "negative") {
        setNegativeUsers(negativeUsers.filter(u => u.id !== user.id))
        setPositiveUsers([...positiveUsers, { ...user, rating: user.rating + 1 }])
        return
      }

      if (user.rating === 5) {
        if (window.confirm(`Нужно вознаградить ${user.username}. Сделать это?`)) {
          handleResetUser(user);
        }
      } else if (user.rating !== undefined) {
        typeUsers === "positive" ?
          setPositiveUsers(
            positiveUsers.map((u) => (u.id === user.id ? { ...user, rating: u.rating! + 1 } : u))
          ) : setNegativeUsers(
            negativeUsers.map((u) => (u.id === user.id ? { ...user, rating: u.rating! + 1 } : u))
          );
      }
    } else if (change === '-') {
      if (user.rating === 0 && typeUsers === "positive") {
        setPositiveUsers(positiveUsers.filter(u => u.id !== user.id))
        setNegativeUsers([...negativeUsers, { ...user, rating: user.rating - 1 }])
        return
      }
      if (user.rating === -5) {
        if (window.confirm(`Пора забанить ${user.username}. Сделать это?`)) {
          handleResetUser(user);
        }
      } else if (user.rating !== undefined) {
        typeUsers === "positive" ? setPositiveUsers(
          positiveUsers.map((u) => (u.id === user.id ? { ...user, rating: u.rating! - 1 } : u))
        ) :
          setNegativeUsers(
            negativeUsers.map((u) => (u.id === user.id ? { ...user, rating: u.rating! - 1 } : u))
          )
          ;
      }
    }
  };

  const handleResetUser = (user: User) => {
    setPositiveUsers(positiveUsers.filter((u) => u.id !== user.id));
    setNegativeUsers(negativeUsers.filter((u) => u.id !== user.id));
    setUsers([...users, { ...user, rating: 0 }]);
  };

  useEffect(() => {
    fetchUsers()
  }, [])


  return (
    <>
      <Navbar fetchUsers={fetchUsers} />
      <Grid container sx={{ minHeight: '100vh' }}>
        <Grid item md={6} sm={12} xs={12} sx={{ borderRight: '1px solid #ccc' }}>
          <div>
            <Box textAlign={"center"}>
              <h2>Список пользователей</h2>
            </Box>
            <Grid container sx={{ padding: '1rem' }}>
              {users.map((user) => (
                <Grid container justifyContent={"center"} key={user.id} item xs={12} sm={12} md={6}>
                  <CardItem
                    user={user}
                    handlePositiveRating={handlePositiveRating}
                    handleNegativeRating={handleNegativeRating} withRating={false} />
                </Grid>
              ))}
            </Grid>
          </div>
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <div>
            <Box sx={{ width: '100%' }}>
              <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} centered>
                <Tab label="Положительные" />
                <Tab label="Отрицательные" />
              </Tabs>
            </Box>
            {tabValue === 0 &&
              <Grid container sx={{ padding: '1rem' }}>
                {positiveUsers.map((user) => (
                  <Grid container justifyContent={"center"} key={user.id} item xs={12} sm={12} md={6}>
                    <CardItem
                      user={user}
                      rating={user?.rating}
                      withRating
                      typeUser='positive'
                      maxFunction={handleRatingChange}
                      minFunction={handleRatingChange}
                    />
                  </Grid>
                ))}
              </Grid>
            }
            {tabValue === 1 &&
              <Grid container sx={{ padding: '1rem' }}>
                {negativeUsers.map((user) => (
                  <Grid container justifyContent={"center"} key={user.id} item xs={12} sm={12} md={6}>
                    <CardItem
                      user={user}
                      rating={user?.rating}
                      typeUser='negative'
                      withRating
                      maxFunction={handleRatingChange}
                      minFunction={handleRatingChange}
                    />
                  </Grid>
                ))}
              </Grid>
            }
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default UserRatingSystem;
