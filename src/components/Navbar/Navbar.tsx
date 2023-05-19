import { Box, Button } from "@mui/material";
import { FC } from "react";

interface NavbarProps {
    fetchUsers: (nextPage?: boolean) => Promise<void>;
}

const Navbar:FC<NavbarProps> = ({fetchUsers}) => {
    return (
        <Box sx={{position: 'sticky', top: '0', background: '#fff', padding: '2rem', borderBottom: '1px solid #ccc', margin: 0, zIndex: 2}} mt={2} mb={2} textAlign={"center"}>
            <Button sx={{ marginRight: '10px' }} onClick={() => fetchUsers()} variant="outlined">Обновить список</Button>
            <Button onClick={() => fetchUsers(true)} variant="outlined">Следующая страница</Button>
        </Box>
    )
}

export default Navbar;