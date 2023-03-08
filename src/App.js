import './App.css';
// import { useState } from "react"
// import Grid from '@mui/material/Grid';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Checkbox from '@mui/material/Checkbox';
// import Button from '@mui/material/Button';
// import Paper from '@mui/material/Paper';


// function generateItems() {
//   const items = [];
//   for (let i = 0; i < 8; i++) {
//     items.push({ name: 'Item ' + i, box: 0, selected: false })
//   }
//   return items;
// }

// function App() {

//   const [items, setItems] = useState(generateItems())

//   function generateMarkup(items) {
//     return (
//       <Paper>
//         <List>
//           {items.map((item) =>
//             <ListItem>
//               <Checkbox onChange={() => handleCheckbox(item)} checked={item.selected} />
//               <span>{item.name}</span>
//             </ListItem>)}
//         </List>
//       </Paper>
//     )
//   }

//   const [leftside, rightside] = items.reduce((acc, cur) => {
//     cur.box === 0 ? acc[0].push(cur) : acc[1].push(cur);
//     return acc;
//   },
//     [[], []]
//   )

//   function handleCheckbox(item) {
//     const newItems = [...items];
//     const index = items.findIndex(i => i === item)
//     newItems[index].selected = !newItems[index].selected;
//     setItems(newItems);
//   }

//   function handleAdd() {
//     const newItems = items.map((item) => ({ ...item, box: item.selected ? 1 : item.box }))
//     setItems(newItems);
//   }

//   function handleRemove() {
//     const newItems = items.map((item) => ({ ...item, box: item.selected ? 0 : item.box }))
//     setItems(newItems);
//   }



//   return (
//     <div className="App">
//       <Grid container>
//         <Grid item xs={5}>
//           {generateMarkup(leftside)}
//         </Grid>
//         <Grid item xs={2} container direction="column" justifyContent="center">
//           <Button onClick={handleAdd}>Add</Button>
//           <Button onClick={handleRemove}>Remove</Button>
//         </Grid>
//         <Grid item xs={5}>
//           {generateMarkup(rightside)}
//         </Grid>
//       </Grid>
//     </div>
//   );
// }

// export default App;

import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function App() {
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([0, 1, 2, 3]);
  const [right, setRight] = React.useState([4, 5, 6, 7]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items) => (
    <Paper sx={{ width: 250, height: 300, overflow: 'auto', margin: 10 }}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`Item ${value + 1}`} />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <div className='App'>
      <h1>Transfer List Elements</h1>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>{customList(left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleAllRight}
              disabled={left.length === 0}
              aria-label="move all right"
            >
              Add All
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              Add
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              Remove
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleAllLeft}
              disabled={right.length === 0}
              aria-label="move all left"
            >
              Remove All
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList(right)}</Grid>
      </Grid>
    </div>
  );
}
