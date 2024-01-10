import React from 'react'
import { Metadata } from 'next'

import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import AccountForm from './AccountForm'

import classes from './index.module.scss'

import { getProjects } from '../../_api/getProducts'



export default async function Account() {
  console.log("Account page")
  const projects = await getProjects()

  console.log(projects, "projects !!!!!!!!!!!!!!!!!!")


  return (
    <div>
      <h5 className={classes.personalInfo}>Personal Information</h5>
      <AccountForm />
      {/* <p>{projects}</p> */}
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Account',
  description: 'Create an account or log in to your existing account.',
  openGraph: mergeOpenGraph({
    title: 'Account',
    url: '/account',
  }),
}

