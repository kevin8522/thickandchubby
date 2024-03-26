import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'sibusiso',
      slug: 'sibusiso457',
      email: 'admin@example.com',

   
      category: 'onenight',
      image: 'https://images.pexels.com/photos/2464535/pexels-photo-2464535.jpeg?auto=compress&cs=tinysrgb&w=600',

      gender: "female" ,
      genderpref: "male" ,
      body: "chubby" ,
  
      country: "France" ,  
      school: "france high school" , 
      birth: "1997" ,
      about: "gdgg dhdgd dgdgdg ddgdgd ddgdg ddgdg dgdgd dgdg" ,
      whatsapp: "1234567890" ,
      phone: "1234567890" ,
      instagram: "www.instagram.com" ,
      age: "28" ,
      city: "Paris" ,
     
      countInStock: 10,
      rating: 4.5,
      numReviews: 10,
      about: 'high quality shirt',
     
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
  
  ],
  products: [
    {
      // _id: '1',
      name: 'lerato',
      slug: 'lerato254',
   
      category: 'onenight',
      image: 'https://images.pexels.com/photos/2464535/pexels-photo-2464535.jpeg?auto=compress&cs=tinysrgb&w=600',

      gender: "female" ,
      genderpref: "male" ,
      body: "chubby" ,
  
      country: "France" ,
      school: "france high school" ,
      birth: "1997" ,
      about: "gdgg dhdgd dgdgdg ddgdgd ddgdg ddgdg dgdgd dgdg" ,
      whatsapp: "1234567890" ,
      phone: "1234567890" ,
      instagram: "www.instagram.com" ,
      age: "28" ,
      city: "Paris" ,
     
      countInStock: 10,
      rating: 4.5,
      numReviews: 10,
      about: 'high quality shirt',
    },
    {
      // _id: '1',
      name: 'nthabiseng',
      slug: 'nthabiseng158',
   
      category: 'friends',
      image: 'https://images.pexels.com/photos/3034903/pexels-photo-3034903.jpeg?auto=compress&cs=tinysrgb&w=600',

      gender: "female" ,
      genderpref: "male" ,
      body: "thick" ,
  
      country: "USA" ,
      school: "Ridgeway high School" ,  
      birth: "2000" ,
      about: "gvjghgbhjhghbg vhjvghjh  ghgjhvhg jhg" ,
      whatsapp: "123456789" ,
      phone: "1234567892" ,
      instagram: "www.instagram.com" ,
      age: "24" ,
      city: "New York" ,
     
      countInStock: 10,
      rating: 4.5,
      numReviews: 10,
    
    },
  ],
};
export default data;
