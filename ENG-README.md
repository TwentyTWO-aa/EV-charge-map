# Electric Vehicle (EV) Charging Station Map

This project is a web application with an intelligent filtering system that displays electric vehicle charging stations worldwide on a map using open-source data.

The system consists of two parts: an intelligent **Node.js Bot** that retrieves data and corrects geographical errors, and a **Leaflet.js-based Interface** that presents this data elegantly to the user.

---

## Setup and Usage (For Developers)

Follow the steps below to run the project on your computer and retrieve up-to-date data.

### 1. Requirements (Prerequisites)
You must have **Node.js** installed on your computer to run the data retrieval bot (veri-botu.js). (Installing the LTS version is recommended).

### 2. Obtain API Key
Get your free API key via Open Charge Map
Paste the API key into the required place on the fourth line of the veri-botu.js file.

### 3. Download the Project
-Clone the project files to your computer or download them as a ZIP file:

-Place the index.html, data-bot.js, and data.js files into a folder.
-Open a PowerShell window in the folder and type "npm install" and press enter.
-To run the veri-botu.js file, type "node veri-botu.js" in the PowerShell window that you opened in the folder and press enter.
-All the data will be retrieved and filtered in approximately 1-2 minutes and all the data will be in the veriler.js file.

#### RUN
-After double-clicking the index.html file, you can view the map.

##### NOTE
-You can retrieve data from more countries by modifying the data-bot.js file.
