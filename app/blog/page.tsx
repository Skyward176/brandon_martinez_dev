import { promises as fs } from 'fs';
async function Blog() {

  //testing opening jsons
  //const file = await fs.readFile(process.cwd() + '/app/projects/database/upLift.json', 'utf8');
  //const data = JSON.parse(file);
  return (
    <div className='text-white p-4'>
      <h1>There's gonna be a blog here, coming soon!</h1>
    </div>
  )
}
export default Blog;