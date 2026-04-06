**SafeDeploy-Node-Flow** ek advanced DevOps showcase hai jo security aur automation ko merge karta hai. Ye pipeline sirf code deploy nahi karti, balki ensure karti hai ki har release **high-quality** aur **vulnerability-free** ho.

🔄 Pipeline Workflow (The Flow)
-------------------------------

Aapka code in stages se guzarta hai:

1.  **Checkout:** GitHub se latest code fetch hota hai.
    
2.  **Code Quality (SonarQube):** Static Analysis ke zariye bugs aur code smells check kiye jate hain.
    
3.  **Build Image:** Dockerfile ka use karke application image banayi jati hai.
    
4.  **Security Scan (Trivy):** Docker image ko scan kiya jata hai taaki koi OS-level ya library vulnerabilities na ho.
    
5.  **Push to Registry:** Scan "Safe" aane par image ko **Docker Hub** par push kiya jata hai.
    
6.  **Deploy:** Final image ko production server par pull karke container run kiya jata hai.
    

🛠 Tech Stack
-------------

*   **Version Control:** GitHub
    
*   **CI/CD Tools:** Jenkins / GitHub Actions
    
*   **Security:** [SonarQube](https://www.sonarqube.org/) (Static Analysis), [Trivy](https://trivy.dev/) (Container Scan)
    
*   **Containerization:** Docker & Docker Hub
    
*   **Deployment:** Self-hosted Linux Server
    

❓ FAQ (Frequently Asked Questions)
----------------------------------

### 1\. Hum Jenkins aur GitHub Actions dono kyun use karte hain?

*   **GitHub Actions** code-centric tasks (jaise linting ya basic checks) ke liye best hai kyunki ye GitHub ke saath natively integrated hai.
    
*   **Jenkins** ko hum heavy automation aur complex deployment workflows ke liye use karte hain, khas kar tab jab humein local servers ya custom plugins (like SonarQube/Trivy) ke saath deep integration chahiye hota hai.
    

### 2\. Trivy Scan ka kya fayda hai?

Build stage ke baad image mein purani libraries ya weak OS patches ho sakte hain. Trivy unhe dhund nikalta hai. Agar Trivy ko "High" ya "Critical" issue milta hai, toh pipeline wahi ruk jati hai aur image Docker Hub par push nahi hoti. **Isse production server hamesha safe rehta hai.**

### 3\. SonarQube yahan kya kar raha hai?

SonarQube code ke "logic" ko check karta hai. Ye dekhta hai ki kya aapne security rules follow kiye hain (e.g., hardcoded passwords) aur kya aapka code maintainable hai.

🚀 Getting Started
------------------

1.  **Clone:** git clone https://github.com/HP04Harsh/FullStack-Ops-Flow.git
    
2.  **Configure:** Apne SonarQube aur Docker Hub credentials Jenkins/GitHub Secrets mein add karein.
    
3.  **Trigger:** Code push karein aur pipeline ko action mein dekhein!
