## Inspiration
Our inspiration came from a desire to make technology more engaging and accessible for seniors. We wanted to create something that could not only entertain but also help improve their coordination and provide mental stimulation. By incorporating gesture-based controls into classic games, we aimed to offer a platform that feels natural and intuitive, while also promoting cognitive and physical engagement in a fun and enjoyable way.

## What it does
Our project is a website designed for seniors that offers gesture-controlled games, including classics like Space Invaders and Snake. Users can navigate and play these games using simple hand gestures, making it a fun and accessible way to interact with technology. The platform combines entertainment with cognitive engagement to help improve coordination and mental agility.

## How we built it
We built the platform using JavaScript for the website's core functionality and Mediapipe's machine-learning tools for gesture recognition using landmarks on a pre-determined hand model. We then tested the landmarks for specific positioning to translate actions in the game to gestures or hand positioning. We also implemented a responsive and user-friendly interface to ensure the platform caters to our senior audience.

## Challenges we ran into
One of the major challenges we faced was implementing collision detection in Space Invaders. Ensuring that bullets properly disappeared upon colliding with the player or aliens required careful logic and debugging. 

Additionally, we were looking to use the MediaPipe's tasks vision package which has both landmarks and already classified recognizable hand gestures to streamline the build. However, we ran into several issues with loading the package onto our devices. We then had to use the MediaPipe hands package which only had landmarks that we used to map out our own gesture control features.

## Accomplishments that we're proud of
We are incredibly proud of creating multiple games for our demo, showcasing the potential of gesture-based controls in a fun and engaging way. Designing a beautifully crafted MVP that is both functional and visually appealing was a significant milestone for us. Additionally, we take immense pride in our teamwork and hard work, which allowed us to bring this project to life in a collaborative and efficient manner. This was also all of our second Hackathon so we were very happy to be able to present an MVP!

## What we learned
This project taught us the importance of user-centric design, especially when working with a specific demographic like seniors. We learned a great deal about Mediapipe's capabilities and how to implement machine learning for real-time applications. Additionally, we gained insights into the challenges of gesture-based interfaces and the value of iterative testing and improvement.

## What's next for Mind Lift
Our next step is to optimize the gesture recognition system further by refining the existing machine learning models or developing our own custom ML solution. This will allow us to provide even more accurate and responsive gesture-based controls, ensuring an even better user experience. Additionally, we aim to expand the range of games on the platform, including more challenging and engaging options, to cater to a broader range of skill levels and interests. By continuing to innovate and improve, we hope to make Mind Lift an essential tool for seniors looking to have fun while staying mentally and physically active. Lastly, we hope to allow users to create their own accounts and keep track of their progress in the games, including data on usage frequency to help us determine how to optimize the set of games available. 
