import React from 'react';
import { Heart, Trash } from 'tabler-icons-react';
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
  createStyles,
  useMantineTheme,
  Divider,
} from '@mantine/core';
import { isExpiredPoll } from '../lib/utils';
import { deletePollById } from '../lib/poll';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  section: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

interface BadgeCardProps {
  handleAfterDelete: Function;
  pollId: number;
  title: string;
  description: string;
  deadline: string;
  isAdmin: boolean;
}
const image = "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"

export default function({handleAfterDelete , pollId, title, description, deadline, isAdmin }: BadgeCardProps) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const Router = useRouter()

  const handleDelete = () => {
    deletePollById(pollId)
    handleAfterDelete()
}
  const isExpired = isExpiredPoll(deadline)

  return (
    <Card shadow={'sm'} withBorder radius="md" p="md" className="col-lg-3 col-md-5 col-10 mx-1 my-1 d-flex flex-column">
      <Card.Section>
        <Image src={image} alt={title} height={180} />
      </Card.Section>
      
      <div className="">
        <Card.Section className={classes.section} mt="md" mb={'md'}>
            <Group position="apart">
            <Text lineClamp={1} size="lg" weight={500}>
                {title}
            </Text>
            </Group>
            {isExpired ? (<>
                <Badge color={'red'} size="sm">
                    Expired
                </Badge>
            </>) : (<>
            </>)}
            <Text lineClamp={2} size="sm" mt="xs">
            {description}
            </Text>
        </Card.Section>        
      </div>

    
      <Group mt="xs" className='mt-auto pt-3'>
        <Button onClick={() => Router.push(`/poll/${pollId}`)} radius="md" style={{ flex: 1 }}>
          Show details
        </Button>
        {isAdmin && (<>
            <ActionIcon onClick={() => {handleDelete()}} variant="default" radius="md" size={36}>
                <Trash size={18} className={classes.like} />
            </ActionIcon>        
        </>)}

      </Group>
    </Card>
  );
}