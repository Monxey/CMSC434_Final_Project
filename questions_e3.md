# Give three examples of metrics of success in the context of usability.  For each, explain whether it is a quantitative or qualitative metric.

A metric of success in usability context is a measurable indicator that helps evaluate how well a system, product, or interface meets its intended goals and user needs. Here are three examples:
## 1. Task Completion Time
- What it measures: The time it takes for users to complete a specific task
- Type: Quantitative metric
- Why: It provides a precise numerical measurement in seconds/minutes that can be statistically analyzed
## 2. User Satisfaction Rating
- What it measures: How satisfied users are with their experience using the interface
- Type: Both Qualitative and Quantitative
- Why: While often collected through numerical scales (quantitative), it also typically includes subjective feedback and comments (qualitative)
## 3. Error Rate
- What it measures: The number of mistakes users make while attempting to complete tasks
- Type: Quantitative metric
- Why: It provides concrete numbers that can be counted and compared across different versions or designs

Each of these metrics provides valuable but different types of insights:
- Quantitative metrics give us hard numbers for comparison
- Qualitative metrics provide deeper understanding of user experiences and feelings
- Some metrics, like satisfaction ratings, can bridge both categories by combining numerical scores with subjective feedback


# Give a context in which we might want to focus on naturalistic evaluation verses more formal experimental approaches and why.

Naturalistic evaluation involves observing users in their natural environment as they interact with a system during their regular activities, with minimal intervention from researchers. Formal experimental approaches, on the other hand, involve controlled settings where specific variables are manipulated and measured under standardized conditions.

## Context: Evaluating a New Hospital Electronic Health Record (EHR) System
### Why Naturalistic is Better Here:
- Healthcare environments are complex and unpredictable
- Real emergencies and interruptions are crucial parts of actual usage
- Staff multitask and collaborate in ways that are hard to replicate in a lab
- The stakes are high (patient safety) so real-world behavior is essential
- Interactions with other hospital systems/workflows can only be observed in situ
In this case, a formal experimental approach might miss critical issues that only emerge in the chaotic reality of a hospital environment. While a controlled study might show that nurses can complete specific tasks efficiently, it wouldn't reveal how the EHR system performs when a nurse is simultaneously managing multiple patients, getting interrupted by emergencies, and coordinating with other healthcare providers.


# When evaluating interfaces, what are the three high-level categories of methods?

## 1. Introspection Methods
- designer evaluates/walks through the prototype
- user evaluates, gains external insights and perspective
## 2. Direct Observation Methods
- simple top level observation of user interaction with the interface
- think-aloud, user says what they're thinking during interaction with interface
- constructive interaction, two users work together to complete tasks
## 3. Query Methods
- Structured interviews, more in depth but more subjective based on interperetation
- Retrospective testing, user completes tasks while being recorded, then watches recording to answer questions about their experience
- contextual inquiry, have structured questions but also observe user in their natural environment
- Surveys and questionnaires, gather quantitative data from large groups


# Identify and explain one of the key propreties of a participant task.

## Property: Tasks Must Be Realistic and Representative
- Tasks should reflect real-world scenarios that actual users would encounter
- They should represent common use cases rather than edge cases
- Example: If testing a banking app, having users check their balance or transfer money between accounts (common tasks) is better than testing how they'd handle a rare system error
- The task should be something users would naturally do with the system, not an artificial scenario created just for testing
- This ensures that the findings from your study will be applicable to how the interface will actually be used in practice
This property is crucial because if tasks aren't realistic, your evaluation results won't provide meaningful insights about how well your interface works in real-world situations.


# Which of the three sub-methods under direct observation would you say is the most powerful?  Describe it and give a context in which you demonstrate why you see it as the most powerful.

Think-Aloud Protocol is arguably the most powerful of the three direct observation methods (think-aloud, field studies, and usability testing) because it provides real-time insight into users' thought processes, not just their actions.
## Context: Evaluating a New Online Tax Filing System
### Why Think-Aloud is Most Powerful Here:
- Users can verbalize their confusion about tax terminology in real-time
- Researchers can understand the reasoning behind user decisions (e.g., "I'm clicking this deduction button because I think my home office qualifies...")
- Immediate feedback about unclear instructions or confusing form layouts
- Reveals assumptions users make about how features work
- Captures emotional responses ("This is frustrating because...")
- Shows hesitation or uncertainty that might not be visible through actions alone
While field studies might show what users do and usability testing might reveal if they can complete tasks, think-aloud protocol uniquely reveals why users make certain choices and where their mental model differs from the system's design. In the tax software example, this is crucial because misunderstandings could lead to serious financial or legal consequences.


# If a researcher at the University of Maryland decided to make a recording of a user study using a hidden camera and microphone in the room, without telling the user, could they get in trouble, and with whom?

Yes, they could get in trouble if the user has not consented and then finds out. Then the user would have to file a complaint with the research board.

# Describe the concept of Retrospective Testing, one strong typical advantage, one potential challenge, and provide an example of how this method could be used in a real-world scenario.

Retrospective Testing is a usability evaluation method where users perform tasks without interruption while being recorded, then later review and comment on their actions while watching the recording with researchers.
### Strong Advantage:
- Users can complete tasks naturally without the cognitive load of verbalizing their thoughts in real-time
- This leads to more authentic behavior and potentially faster, more natural task completion
- The replay session can capture deeper insights since users have time to reflect on their actions
### Potential Challenge:
- Users might forget their exact thought process or reasoning by the time they review the recording
- The delay between action and explanation could lead to post-rationalization or incomplete recollection
- Sessions effectively take twice as long (task time + review time)
### Real-World Example:
- Testing a new mobile banking app's money transfer feature:
- Users complete several money transfers while being recorded
- During replay, they might notice and explain things like:
  - "I hesitated here because I wasn't sure if I needed the routing number"
  - "I almost tapped the wrong account because the icons look too similar"
  - "I didn't notice this shortcut button during the actual task"


# When preparing questions for a structured interview to be held after your participant has attempted a variety of tasks in a direct observation session, what is a type of question to avoid? Explain the notion of "simple questions, detailed answers" in this context.  Provide an example of a high-quality question that you could ask your participant if they had just tried out a prototype of the new version of the Testudo website.

A leading question could be something like "Did you find the website easy to navigate?" This implies that the interface should be easy to navigate. A better question would be, "What aspects of the website influenced ease of use?"


# You are designing a survey to collect data on the satisfaction of customers who have recently purchased a new product. What are some important considerations you should keep in mind when designing your survey? Provide an example of a high-quality question that you could place on such a survey.

Product surveys could imply many responses, so a simple question to process could be "on a scale of 1-10, is the product worth the cost?"


# Identify and explain one thing that your interview questions should *not* do or be.

Interview questions should not be leading, as this could impart bias to the user's response.


# Give an example of a possible diversity and/or inclusion issue that could arise if using tools such as Zoom to conduct your interviews.

Not everyone has a webcam or device.


# Which of the effects that we discussed is most relevant in the context of testing a new version of an existing piece of software and why?  Provide a real or realistic example to demonstrate the issue.  For the effect that you chose, describe a way in which the study designer could either avoid the effect or at least nullify its impact on the results.

# In the context of utilizing user testing to evaluate a new user interface as compared to an earlier version, which of the discussed psychology effects could most likely come into play?  Explain why and how.  Give an example of an approach to address the specific effect that you chose.
## Hawthorne Effect in Version Comparison Testing
- Users know they're being observed
- They're aware it's a comparison study
- They might try to "help" by performing better
- They could change their natural behavior to meet perceived expectations
- User also has previous knowlege of usability


# Explain the difference between the Hawthorne Effect and the Clever Hans effect.

Hawthorne Effect is about participants changing their behavior because they know they're being studied
Clever Hans Effect is about researchers accidentally influencing participant behavior through subtle cues


# How could designers creating their own study about a new user interface trigger the Pygmalion Effect?

The Pygmalion Effect occurs when researchers' expectations about participants influence the outcome of the study.
### Through Direct Communication:
- Expressing excitement about specific features they designed
- Making comments like "This should be really easy to use"
- Telling participants "Everyone else found this intuitive"
### Through Unconscious Behaviors:
- Showing disappointment when users struggle with their "favorite" features
- Appearing more eager or attentive when testing new elements vs. old ones
- Rushing through parts they expect to be problematic
### Through Study Design:
- Creating tasks that showcase their design's strengths
- Avoiding scenarios they suspect might be problematic
- Setting up leading questions that favor their design choices


# What effect could come into play if Meta ran a study comparing their latest Quest VR headset to the latest Vive VR headset from HTC.  How could Meta avoid this potential issue?

Experimenter Bias 
Bias toward their own design or toward a positive outcome for their design


# If a particular effect only had a 20% chance of happening, would it still be worth taking steps to prevent.  Justify your answer.


# Identify and explain an ethical consideration related to Human-AI interaction.
- Users should know when they're interacting with AI vs. humans
- People may share personal information without realizing how it might be used


# Of the ideas Respect, Beneficence, and Justice from the Belmont Report, which of the three do you think is the most important, any why.  In your response, explain the meaning of the one that you selected and explain your reasoning for selecting it.

Respect - acknowledging and protecting the autonomy of research participants, ensuring they can make informed decisions about their participation
Beneficence - research should maximize benefits while minimizing harm to participants.
Justice - fair distribution of both benefits and burdens of research across different populations.


# In the context of ethical studies, identify three things that you should do before beginning an experiment with a subject.

1. Obtain Informed Consent
2. Screen for Eligibility and Exclusion Criteria
3. Review Participant Rights and Study Protocol


# Give an example of something that should be done after the user study session concludes, in terms of ethical considerations for your participant.

Debriefing should contain:
- Explanation of study's purpose
- Questions about user experience
- Provide contact information
- Provide any compensation


# What is an example of something real or realistic that would likely get a proposal rejected by the IRB?

Proposal: Testing Emergency Response UI Under Stress
1. Induced Psychological Stress
2. Deception Without Justification
3. Risk-Benefit Imbalance
Overall difficult to inform participants without introducing bias, but this causes a risk imbalance


# Both heuristic evaluations and the System Usability Scale have humans and their subjectivity involved.  Identify and explain one way in which undertaking a heuristic evauation is better than performing a study using the System Usability Scale.

## Heuristic Evaluation Provides:
- Detailed explanations of specific problems
- Clear identification of where issues occur
- Direct links to usability principles being violated
- Concrete suggestions for improvements
- Examples of how to fix identified issues
## Whereas SUS Only Provides:
- Numerical scores (0-100)
- General satisfaction levels
- Broad usability assessment
- No specific problem identification
- No guidance on what to improve


# Which of our list of 9 heuristic categories do you think is the most important to avoid violating and why?

1. Simple and natural dialogue
2. Speak the users' language / avoid jargon
3. Minimize user's memory load
4. Be consistent, internally and with standards
5. Provide feedback
6. Provide clearly marked exits
7. Provide shortcuts
8. Deal with / prevent errors in a positive and helpful manner
9. Provide (or remove need for) help/documentation

Feedback - Users need to know if their actions were successful.
- Supports error prevention (#8) by showing problems immediately
- Enhances natural dialogue (#1) through clear communication
- Reduces memory load (#3) by confirming actions
- Makes consistency (#4) more apparent through clear responses


# Pick three of the 9 heuristic categories from our list, and for each give a realistic example of a design choice that would violate it in the context of your team project.


# We discussed having 3-5 evaluators on a heuristic evaluation team.  Explain why using more evaluators is not suggested, and discuss whether or not the reasons seem reasonable given your Phase 3 experiences.


# When talking about dealing with and/or preventing errors in positive/helpful manner, the idea of "slips" and "mistakes" came up.  Describe what "mistakes" are as opposed to "slips" in that context of preventing and/or dealing with user errors.

## Mistakes
### Mental/Cognitive Errors
- Wrong understanding of how something works
- Incorrect mental model of the system
- Wrong goal or plan of action
- Based on faulty knowledge or judgment
### Examples of Mistakes:
- Trying to delete a file by moving it to desktop
- Clicking "Reply" instead of "Reply All" because you don't understand the difference
- Using the wrong formula in a spreadsheet
- Choosing the wrong settings because you misunderstand their purpose
## Slips
### Physical/Action Errors
- Right intention, wrong execution
- Accidental actions
- Muscle memory errors
- Attention lapses
### Examples of Slips:
- Typos while typing
- Clicking the wrong button when you meant to click another
- Accidentally double-clicking instead of single-clicking
- Selecting the wrong item from a dropdown menu


# Explain which you feel is a better approach is UI/UX design; preventing errors, alerting about errors, or auto-correcting errors.  Explain and justify your answer.

Error prevention minimizes the likelihood of errors occurring in the first place.
- less interruptions
- reduces cognitive load
- better than auto-correction edge case failures


# Give an example of a new heuristic evaluation category that should be added to our list of 9, based on either your Phase 3 experiences, or your own usability issues with software or websites that you use.


# What, if any, relationship is there between the heuristic categories that we use and our general design principles from earlier in the semester?


# Assume that you are doing a heuristic evaluation of a Windows 12 Beta and your computer did the following.  Provide a fully formed heuristic evaluation entry, with all of the elements it should have, using our list of heuristics and the required entry style, regarding this part of the interface.  Be sure to make it a complete entry and that it speaks directly about the image below as part of the described task.