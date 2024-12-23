import React from 'react'
import CopyrightIcon from '@mui/icons-material/Copyright';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {

  const currentYear = new Date().getFullYear()
  return (
    <div className='text-center'>
      <ul className='flex justify-center'>
        <li className='m-2'><InstagramIcon /></li>
        <li className='m-2'><LinkedInIcon /></li>
        <li className='m-2'><GitHubIcon /></li>
      </ul>
      <div><CopyrightIcon className='mx-2' /><span className='text-lg'>Copyright {currentYear}</span></div>
    </div>
  )
}

export default Footer