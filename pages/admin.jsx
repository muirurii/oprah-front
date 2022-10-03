import React from 'react'
import FormFields from '../components/FormFields'

const Admin = () => {
  return (
    <main className="px-4 min-h-screen">
    <h1 className="text-3xl pt-4 text-center">Add a post</h1>
        
        <FormFields initial={{}} buttonText="Add post"/>
    </main>
  )
}

export default Admin