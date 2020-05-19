import React from 'react';
import { ContentfulClient, ContentfulProvider, useContentful} from 'react-contentful';
import './App.css';

const Page = props => {
  const { data, error, fetched, loading } = useContentful({
    contentType: 'info',
    query: {
      // 'fields.name': `/${props.match.slug || ''}`,
      select: 'fields'

    }
  });
 
  if (loading || !fetched) {
    return null;
  }
 
  if (error) {
    console.error(error);
    return null;
  }
 
  if (!data) {
    return <p>Page does not exist.</p>;
  }
 
  // See the Contentful query response
  console.debug(data);
 
  // Process and pass in the loaded `data` necessary for your page or child components.
  return (
    <div style={{display: "flex", flexDirection:"column", justifyContent: "center"}}>
      <h2 style={{textAlign:"center"}}>Brazilian media repository</h2>
      {data.items.map(item => (
        <article 
          style={{
            width: "90vw",
            backgroundColor: `${item.fields.tags["tags"][0] === "series" ? "#f7f7f7" : "#f7e7f7"}`,
            margin: "20px",
            padding: "10px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderRadius: "5px",
            boxShadow: "0 0 5px 0px"}} >
          <img 
            src={item.fields.thumbnail.fields.file.url} 
            style={{
              width:"200px",
              height: "200px",
              margin: "20px"}}
            alt="Movie Thumbnail"></img>
          <div>
            <h1>{item.fields.titleEn}  ({item.fields.year})</h1>
            <h3>{item.fields.titleBr}</h3>
            <ul>
              <li>{item.fields.tags["tags"][0]}</li>
            </ul>
            <p>{item.fields.description}</p>
            <p>{item.fields.author}</p>
            <a href={item.fields.url}>[Trailer]</a>
          </div>
        </article>
      ))}
      </div>
  )
}


const contentfulClient = new ContentfulClient({
  accessToken: 'NnsVrwmMZFJlsgBjsK_eBQ5hkCqe_kRhyOdITeExp-8',
  space: '5lza0qg1mjjz',
});


const App = () => (
  <ContentfulProvider client={contentfulClient}>
    <Page/>
  </ContentfulProvider>
)


export default App;