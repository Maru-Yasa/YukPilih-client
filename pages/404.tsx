import { Text, Group, Title, Button } from "@mantine/core";
import { useRouter } from "next/router";
import useStyles from '../components/Welcome/Welcome.styles';

export default function(){
    const Router = useRouter()
    const { classes } = useStyles();
    return <>

      <Title className={classes.title} align="center" mt={100}>
        Page Not Found{' '}
        <Text inherit variant="gradient" component="span">
          404
        </Text>
      </Title>

      <Group position="center">
        <Button onClick={() => { Router.push('/') }} size="lg" variant="outline">
            Go back
        </Button>
      </Group>

    </>
}