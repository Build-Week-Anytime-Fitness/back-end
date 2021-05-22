exports.seed = async function (knex) {
  await knex('classes').insert([
    { class_name: 'oldie but goldie', class_type: 'jazzersize', class_date: 'Monday', start_time: '9:00 am', duration: 1, intensity: 'high', location: 'anywhere', max_class_size: 10, instructor_id: 1 },
    { class_name: 'roomba-zoomba', class_type: 'cardio', class_date: 'Tuesday', start_time: '4:00 pm', duration: 1, intensity: 'medium', location: 'home', max_class_size: 15, instructor_id: 1 },
    { class_name: 'hercules', class_type: 'weights', class_date: 'Wednesday', start_time: '3:00 pm', duration: 30, intensity: 'high', location: 'garage', max_class_size: 5, instructor_id: 1 },
    { class_name: 'cardio-master', class_type: 'cardio', class_date: 'Friday', start_time: '11:00 am', duration: 45, intensity: 'high', location: 'living room', max_class_size: 30, instructor_id: 2 },
    { class_name: 'Trip to Nirvana', class_type: 'yoga', class_date: 'Thursday', start_time: '7:00 am', duration: 60, intensity: 'low', location: 'park', max_class_size: 40, instructor_id: 2 },
  ])
};

