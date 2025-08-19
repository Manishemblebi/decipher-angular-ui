-- Definition tables
CREATE TABLE VIRUS_VARIANTS_DEF (
                                  VARIANT_ID INT PRIMARY KEY,
                                  VARIANT_NAME VARCHAR(255) NOT NULL
);

CREATE TABLE HEALTH_CONDITIONS_DEF (
                                     CONDITION_ID INT PRIMARY KEY,
                                     CONDITION_NAME VARCHAR(255) NOT NULL
);

-- Transactional table
CREATE TABLE HOSPITAL_ADMISSIONS (
                                   ADMISSION_ID INT PRIMARY KEY,
                                   PATIENT_AGE INT NOT NULL,
                                   VARIANT_ID INT NOT NULL,
                                   LENGTH_OF_STAY_DAYS INT,
                                   FOREIGN KEY (VARIANT_ID) REFERENCES VIRUS_VARIANTS_DEF(VARIANT_ID)
);

-- Junction table for many-to-many relationship
CREATE TABLE ADMISSION_CONDITIONS (
                                    ADMISSION_ID INT NOT NULL,
                                    CONDITION_ID INT NOT NULL,
                                    PRIMARY KEY (ADMISSION_ID, CONDITION_ID),
                                    FOREIGN KEY (ADMISSION_ID) REFERENCES HOSPITAL_ADMISSIONS(ADMISSION_ID),
                                    FOREIGN KEY (CONDITION_ID) REFERENCES HEALTH_CONDITIONS_DEF(CONDITION_ID)
);
