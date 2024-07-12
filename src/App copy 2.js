import './App.css';
import FileUploader from './components/FileUploader/FileUploader';

function App() {
  
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/todos');
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data_ = await response.json();
      console.log("Data received:", data_);
      let filtered = data_.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()))

      setData(filtered)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 500); // 500ms bekleyerek arama işlemini gerçekleştiriyoruz
    return () => clearTimeout(timer); // Component yeniden render edilirken timer'ı temizle
  }, [searchText]);


  function handleSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const todo = formData.get('todo');
      const isDone = formData.get('isDone') === 'on';
      console.log("dfds:", todo)
      const response = fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: todo,
          completed: isDone,
        })
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      fetchData()
    } catch (e) {
      console.error("sending error!")
    }
  }
  
  const convertDate = (date_) => {
    if (date_ !== undefined) {
      const parts = date_.split('-')
      if (parts.length === 3) {
        const day = parseInt(parts[0])
        const month = parseInt(parts[1])
        const year = parseInt(parts[2])
        let today = new Date(year, month, day);
        today.setDate(today.getDate() + 2);
        console.log("today.year:",today.getFullYear())
        console.log("today.month:",today.getMonth())
        return today.toDateString()
      }
    } else {
      return 'Invalid Date!'
    }
  }

  
  const memoizedData = useMemo(() => {
    return (
      <div style={styles.todoItems} key='uniqueid'>
        <table >
          <thead style={{ color: 'red', margin: 1, padding: 10 }}>
            <tr>
              <td style={{ width: 50, textAlign: 'left' }}>Checked</td>
              <td style={{ width: 50, textAlign: 'center' }}>Id</td>
            </tr>
          </thead>
          <tbody>
            {
              data.map(item => <tr key={item.id}>
                <td style={{ width: 50, textAlign: 'center' }}>
                  <input
                    type='checkbox'
                    onChange={(e) => handleCheck(e, item)}
                    checked={item.completed}
                  />
                </td>
                <td style={{ width: 50, textAlign: 'center' }}>{item.id}</td>                
              </tr>)
            }
          </tbody>
        </table>

      </div>
    )
  }, [data,convertDate,handleCheck])
  const renderData = () => {

    return memoizedData;
  };

  if (loading) {
    return <div style={styles.loading}>
      Loading . . .
    </div>
  }
  return (
    <div style={styles.container}>

      <div style={styles.uploadContainer}>
        <h1>Upload File</h1>

        <FileUploader />
      </div>
      <div style={styles.searchContainer}>
        <h1>Search ToDo</h1>

        <input type='search' value={searchText} onChange={e => setSearchText(e.target.value)} />
      </div>
      <div style={styles.todoContainer}>
        <h1>Show ToDo</h1>

        {renderData()}
      </div>
      <div>
        <h1>Add ToDo</h1>

        <form action="" style={styles.formContainer} onSubmit={handleSubmit}>
          <div style={styles.formItems}>
            <label htmlFor="name">Enter To DO: </label>
            <input type="text" name="todo" id="todo" required />
          </div>
          <div >
            <label htmlFor="isDone">Enter situation: </label>
            <input type="checkbox" name="isDone" id="isDone" />
          </div>
          <div >
            <input type="submit" value="Add !" />
          </div>
        </form>
      </div>

    </div>
  );
}

export default App;

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  loading: {
    display: 'flex',
    flexDirection: 1,
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center'
  },
  uploadContainer: {
    border: '1px solid #ccc',
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoItems: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'flex-start',
    minWidth: '100%',
  },
  formContainer: {
    backgroundColor: 'orange',
  },
  formItems: {
    backgroundColor: 'red'
  }
};