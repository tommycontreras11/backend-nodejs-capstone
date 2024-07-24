# User's stories

## User story 1

**Title:** Implement Search service API

**Labels:** new

**Assignees:** tommycontreras11

    **As a** [customer]
    **I need** [to search by specific parameters]
    **So that** [help me to have better results]

### Details and Assumptions
    * The page will display results based on the parameters.
    * If the customer does not set parameters, the page will display all the results..

### Acceptance Criteria
    Given [a project with items]
    When [the customer search by parameters]
    Then [the page will display results based on it]
---

## User story 2

**Title:** Implement Login backend service API

**Labels:** new

**Assignees:** tommycontreras11

    **As a** [customer]   
    **I need** [to log in to the platform]  
    **So that** [I can manage items]

### Details and Assumptions
    * When the user is logged in, the platform should display all the items.
    * If the user is not logged in, the platform should allow access.
    * The email must exist.
    * The password must exist.

### Acceptance Criteria
    Given [the customer provides a valid email and password]  
    When [the credentials are correct]  
    Then [the customer should be redirected to the platform]
---

## User story 3

**Title:** Implement Registration backend service API

**Labels:** new

**Assignees:** tommycontreras11

    **As a** [customer]   
    **I need** [to create my account]  
    **So that** [help me to log in and view item details]

### Details and Assumptions
    * FirstName, LastName, Email and Password must all be valid.
    * Upon successful registration, the customer should be able to log in and access item details.

### Acceptance Criteria
    Given [valid user information]
    When [the user clicks on 'Register']
    Then [the account should be successfully registered]
---

## User story 4 

**Title:** Implement User Profile backend service API

**Labels:** new

**Assignees:** tommycontreras11

    **As a** [customer]   
    **I need** [to update my profile]  
    **So that** [I can keep my data up to date]

### Details and Assumptions
    * I need a page to update my data.

### Acceptance Criteria
    Given [valid user information]
    When [the user clicks on 'Edit']
    Then [the account should be successfully updated]
---

## User story 5

**Title:** Implement Sentiment Analysis service API

**Labels:** icebox

**Assignees:** tommycontreras11

    **As a** [customer]
    **I need** [to have Sentiment Analysis implemented]
    **So that** [I can detect negative comments]

### Details and Assumptions
    * Implement criteria-based sentiment analysis to categorize comments.

### Acceptance Criteria
    Given [comments]
    When [the sentiment analysis criteria are applied to each comment]
    Then [negative comments should be accurately detected]
  ---

## User story 6

**Title:** Integrate the frontend provided with the backend

**Labels:** new

**Assignees:** tommycontreras11

    **As a** [customer]
    **I need** [to integrate the provided frontend  with the backend]
    **So that** [I can view my items on the frontend]

### Details and Assumptions
    * Make the necessary configurations to connect the backend with the frontend.

### Acceptance Criteria
    Given [the backend app is set up]
    When [the integration between backend and frontend is completed]
    Then [I can access and use the application to view my items]
---

## User story 7

**Title:** Add CI/CD pipelines for backend services

**Labels:** new

**Assignees:** tommycontreras11

    **As a** [DevOps Engineer]
    **I need** [to add CI/CD pipelines for backend services]
    **So that** [we can automate the deployment process, ensuring faster and more reliable releases]

### Details and Assumptions
    * The CI/CD pipelines will include automated testing, build, and deployment stages.

### Acceptance Criteria
    Given [the backend services codebase is in the version control system]
    When [a new code change is pushed to the repository]
    Then [the CI pipeline should automatically run unit tests and integration tests]
  ---

## User story 8

**Title:** Containerize the services and applications

**Labels:** new

**Assignees:** tommycontreras11

    **As a** [DevOps Engineer]
    **I need** [to containerize the services and applications]
    **So that** [they can be consistently deployed across different environments and managed more efficiently]

### Details and Assumptions
    * The services and applications are currently deployed on virtual machines or physical servers.
    * The container images will be stored in a container registry.

### Acceptance Criteria
    Given [the backend services and applications codebase is in the version control system]
    When [a new code change is pushed to the repository]
    Then [the CI pipeline should automatically build Docker images for the services and applications]
---

## User story 9

**Title:** Deploy backend services

**Labels:** new

**Assignees:** tommycontreras11

    **As a** [DevOps Engineer]
    **I need** [to deploy backend services]
    **So that** [they are accessible and operational for end users and other systems]

### Details and Assumptions
    * The backend services are currently developed and tested in the development environment.
    * Deployment will involve moving the services from the staging environment to the production environment.

### Acceptance Criteria
    Given [the backend services are containerized and the images are stored in the container registry]
    When [the CI pipeline runs after a code change]
    Then [the pipeline should build and push updated Docker images to the container registry]
---

## User story 10

**Title:** Research authentication in Express

**Labels:** technical debt

**Assignees:** tommycontreras11

    **As a** [developer]
    **I need** [to research authentication in Express]
    **So that** [help my project to have security]

### Details and Assumptions
    * Implement authentication to prevent users from accessing certain pages.

### Acceptance Criteria
    Given [a not authenticated user]
    When [the user try to access certain pages]
    Then [the user should be redirected back]
