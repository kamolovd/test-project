import { FC, ReactNode } from "react";
import { User } from "../UserRaitingSystem";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


type ChangeValueFunction = (user: User, change: '+' | '-', typeUsers: 'negative' | 'positive') => void;

export interface CardProps {
    user: User,
    rating?: number;
    typeUser?: 'positive' | 'negative';
    withRating: boolean;
    minFunction?: ChangeValueFunction;
    maxFunction?: ChangeValueFunction;
    handlePositiveRating?: (user: User) => void;
    handleNegativeRating?: (user: User) => void;
}


const CardItem: FC<CardProps> = ({ user, rating, typeUser, withRating, minFunction, maxFunction, handlePositiveRating, handleNegativeRating }) => {
    return (
        <Card sx={{ maxWidth: 345, padding: '2rem', margin: '1rem' }}>
            <CardMedia
                sx={{ width: 200, height: 140 }}
                image={user?.avatar}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {user.username} {rating !== undefined && `(${rating})`}
                </Typography>
            </CardContent>
            <CardActions>
                {withRating ?
                    <>
                        <Button variant="contained" onClick={() => maxFunction && maxFunction(user, '+', typeUser || 'positive')} size="small">Повысить</Button>
                        <Button variant="contained" onClick={() => minFunction && minFunction(user, '-', typeUser || 'negative')} size="small">Понизить</Button>
                    </>
                    :
                    <>
                        <Button variant="contained" onClick={() => handlePositiveRating && handlePositiveRating(user)} size="small">+</Button>
                        <Button variant="contained" onClick={() => handleNegativeRating && handleNegativeRating(user)} size="small">-</Button>
                    </>
                }
            </CardActions>
        </Card>
    )
}

export default CardItem;