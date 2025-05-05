export default {
    madrid: {
      name: "Madrid",
      continent: "Europa",
      lugaresDeInteres: [
        {
            name: "Museo del Prado",
            type: "museo",
            image: "https://media.timeout.com/images/106133984/750/422/image.jpg",
            description: "Uno de los museos de arte más importantes del mundo.",
            description_larga: `El Museo del Prado es uno de los museos de arte más importantes del mundo, ubicado en Madrid, España. 
                Alberga una vasta colección de obras maestras de artistas como Velázquez, Goya y El Greco. Su arquitectura neoclásica y su 
                rica historia lo convierten en un destino imperdible para los amantes del arte.`,
            price_range: "€€",
            location: `Calle de Felipe IV, s/n, 28014 Madrid, España`,
            transport: [
                { type: "Metro", line: "L2", station: "Banco de España" },
                { type: "Bus", line: "001", station: "Museo del Prado" }
                ],
            horario: `Lunes a sábado de 10:00 a 20:00, domingos y festivos de 10:00 a 19:00`,
            normativa: `El museo tiene una política de no permitir fotografías con flash y se recomienda el uso de auriculares para las audioguías.`,
            enlace: `https://www.museodelprado.es/`
          
        },
        {
            name: "Parque del Retiro",
            type: "parque",
            image: "https://patrimonioypaisaje.madrid.es/FWProjects/monumenta/Edificios/90002/03.05-img%201.jpg",
            description: "Un gran parque en el centro de Madrid, perfecto para pasear.",
            description_larga: `El Parque del Retiro es un extenso parque urbano en el corazón de Madrid, España. 
                Originalmente un jardín real, hoy es un lugar popular para pasear, hacer picnics y disfrutar de actividades al aire libre. 
                Con hermosos jardines, estanques y monumentos, es un oasis de tranquilidad en medio de la bulliciosa ciudad.`,
            price_range: "Gratis",
            location: `Plaza de la Independencia, 7, 28001 Madrid, España`,
            transport: [
                { type: "Metro", line: "L2", station: "Retiro" },
                { type: "Bus", line: "001", station: "Puerta de Alcalá" }
                ],
            horario: `Abierto todos los días de 6:00 a 22:00`,
            normativa: `Se permite la entrada con mascotas, pero deben ir atadas. No se permite hacer fuego ni acampar.`,
            enlace: `https://www.esmadrid.com/espacios-naturales/parque-del-retiro`
        }
      ]
    },
    barcelona: {
      name: "Barcelona",
      continent: "Europa",
      lugaresDeInteres: [
        {
            name: "Sagrada Familia",
            type: "monumento",
            image: "https://www.recordrentacar.com/blog/wp-content/uploads/2023/08/sagrada-familia-barcelona-scaled.jpeg",
            description: "Obra maestra inacabada de Gaudí.",
            description_larga: `La Sagrada Familia es una basílica católica en Barcelona, diseñada por el arquitecto Antoni Gaudí. 
                Su construcción comenzó en 1882 y aún está en curso. La iglesia es famosa por su arquitectura única y sus intrincados detalles, 
                que combinan elementos góticos y art nouveau. Es un símbolo icónico de la ciudad y un Patrimonio de la Humanidad de la UNESCO.`,
            price_range: "€€€",
            location: `Carrer de Mallorca, 401, 08013 Barcelona, España`,
            transport: [
                { type: "Metro", line: "L5", station: "Sagrada Família" },
                { type: "Metro", line: "L2", station: "Sagrada Família" },
                { type: "Bus", line: "V19", station: "Sagrada Família - Provença" },
                { type: "Bus", line: "V21", station: "Sagrada Família - Provença" }
                ],
            horario: `Lunes a domingo de 9:00 a 20:00`,
            normativa: `No se permite el uso de trípodes ni flash en el interior. Se recomienda respetar el silencio y la solemnidad del lugar.`,
            enlace: `https://sagradafamilia.org/`
                
        },
        {
            name: "Parque Güell",
            type: "parque",
            image: "https://cdn-imgix.headout.com/media/images/3e5f61c966be04ede4094955fbae3759-Park%20Guell%20.jpg?auto=format&w=1222.3999999999999&h=687.6&q=90&fit=crop&ar=16%3A9&crop=faces",
            description: "Un parque colorido y artístico diseñado por Gaudí.",
            description_larga: `El Parque Güell es un parque público en Barcelona, diseñado por Antoni Gaudí. 
                Es famoso por su arquitectura colorida y sus mosaicos de cerámica. Originalmente concebido como una ciudad-jardín, 
                el parque alberga varias estructuras únicas, incluyendo la famosa salamandra de mosaico. Es un lugar ideal para pasear 
                y disfrutar de vistas panorámicas de la ciudad.`,
            price_range: "€€",
            location: `Carrer d'Olot, 5, 08024 Barcelona, España`,
            transport: [
                { type: "Metro", line: "L3", station: "Vallcarca" },
                { type: "Bus", line: "24", station: "Parc Güell" },
                { type: "Bus", line: "92", station: "Parc Güell" }
                ],
            horario: `Lunes a domingo de 9:30 a 19:30`,
            normativa: `No se permite el uso de bicicletas ni patinetes dentro del parque. Se recomienda no tocar las obras de arte.`,
            enlace: `https://parkguell.barcelona/`
        }
      ]
    }
  }

  