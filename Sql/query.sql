
--  1. the age of the youngest patient admitted with the B.1.1.7 variant
SELECT MIN(age) AS youngest_age
FROM Admission a
       JOIN VirusVariant v ON a.variant_id = v.variant_id
WHERE v.name = 'B.1.1.7';

--  2. how many admissions are associated with each of the underlying conditions mentioned above
SELECT c.name AS condition_name, COUNT(DISTINCT ac.admission_id) AS admission_count
FROM Condition c
       LEFT JOIN AdmissionCondition ac ON c.condition_id = ac.condition_id
GROUP BY c.name;
--  3. the total time spent in hospital with each variant of each virus
SELECT v.name AS variant_name, SUM(a.length_of_stay) AS total_days
FROM Admission a
       JOIN VirusVariant v ON a.variant_id = v.variant_id
GROUP BY v.name;

--  4. the size of the control group

SELECT COUNT(*) AS control_group_size
FROM Admission a
       LEFT JOIN AdmissionCondition ac ON a.admission_id = ac.admission_id
WHERE ac.condition_id IS NULL;

