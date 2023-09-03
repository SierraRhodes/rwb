//Displays a list of stories available to read. This can include both private and public stories.
function App() {
  const stories = [
    {
      id: 1,
      title: 'Sample Story 1',
      content: 'This is the content of the first sample story.',
      userId: 123, // Owner's user ID
      chapters: [
        {
          id: 101,
          title: 'Chapter 1',
          content: 'This is the content of Chapter 1.',
        },
        {
          id: 102,
          title: 'Chapter 2',
          content: 'This is the content of Chapter 2.',
        },
        // ... more chapters ...
      ],
    },
    {
      id: 2,
      title: 'Sample Story 2',
      content: 'This is the content of the second sample story.',
      userId: 456, // Owner's user ID
      chapters: [
        {
          id: 201,
          title: 'Chapter A',
          content: 'This is the content of Chapter A.',
        },
        {
          id: 202,
          title: 'Chapter B',
          content: 'This is the content of Chapter B.',
        },
        // ... more chapters ...
      ],
    },
    // ... more stories ...
  ];

  const user = {
    id: 123, // The user's ID
  };
}