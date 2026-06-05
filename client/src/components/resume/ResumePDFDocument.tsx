import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import { type ResumeData } from "../../store/resume-store";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    lineHeight: 1.6,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },

  header: {
    flexDirection: "row",
    borderBottom: "2 solid #06b6d4",
    paddingBottom: 16,
    marginBottom: 20,
  },

  photo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 16,
  },

 headerContent: {
  flex: 1,
  paddingTop: 8,
},

 name: {
  fontSize: 24,
  fontWeight: "bold",
  marginBottom: 10,
  color: "#0f172a",
},

 jobTitle: {
  fontSize: 14,
  color: "#0891b2",
  marginTop: 4,
  marginBottom: 12,
},

  contact: {
    fontSize: 10,
    color: "#444",
    marginBottom: 2,
  },

  section: {
    marginTop: 14,
  },

  heading: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#0891b2",
    marginBottom: 8,
    borderBottom: "1 solid #cbd5e1",
    paddingBottom: 4,
    textTransform: "uppercase",
  },

  bodyText: {
    fontSize: 11,
lineHeight: 1.6,
  },

  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },

 skillTag: {
  backgroundColor: "#cffafe",
  paddingTop: 4,
  paddingBottom: 4,
  paddingLeft: 8,
  paddingRight: 8,
  fontSize: 9,
  borderRadius: 20,
},

 leftColumn: {
  width: "30%",
  backgroundColor: "#f8fafc",
  padding: 12,
},

rightColumn: {
  width: "70%",
  paddingLeft: 20,
},

contentWrapper: {
  flexDirection: "row",
  marginTop: 20,
},

divider: {
  width: 1,
  backgroundColor: "#e5e7eb",
  marginHorizontal: 10,
},
});

interface Props {
  data: ResumeData;
}

export default function ResumePDFDocument({
  data,
}: Props) {
  const skills =
    data.skills
      ?.split(",")
      .map((s) => s.trim()) || [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}

        <View style={styles.header}>
          {data.photo ? (
            <Image
              src={data.photo}
              style={styles.photo}
            />
          ) : null}

          <View style={styles.headerContent}>
            <Text style={styles.name}>
              {data.fullName}
            </Text>

           {data.jobTitle && (
  <Text style={styles.jobTitle}>
    {data.jobTitle}
  </Text>
)}

            <Text style={styles.contact}>
              {data.email}
            </Text>

            <Text style={styles.contact}>
              {data.phone}
            </Text>

            <Text style={styles.contact}>
              {data.location}
            </Text>

            <Text style={styles.contact}>
              LinkedIn: {data.linkedin}
            </Text>

            <Text style={styles.contact}>
              GitHub: {data.github}
            </Text>

            <Text style={styles.contact}>
              Portfolio: {data.portfolio}
            </Text>
          </View>
        </View>

          <View style={styles.contentWrapper}>

  {/* LEFT COLUMN */}

  <View style={styles.leftColumn}>

    <View style={styles.section}>
      <Text style={styles.heading}>
        Skills
      </Text>

      <View style={styles.skillContainer}>
        {skills.map((skill) => (
          <Text
            key={skill}
            style={styles.skillTag}
          >
            {skill}
          </Text>
        ))}
      </View>
    </View>

    <View style={styles.section}>
      <Text style={styles.heading}>
        Languages
      </Text>

      <Text>{data.languages}</Text>
    </View>

    <View style={styles.section}>
      <Text style={styles.heading}>
        Certifications
      </Text>

      <Text>
        {data.certifications}
      </Text>
    </View>
  </View>

  {/* Divider */}

  <View style={styles.divider} />

  {/* RIGHT COLUMN */}

  <View style={styles.rightColumn}>

    <View style={styles.section}>
      <Text style={styles.heading}>
        Professional Summary
      </Text>

      <Text>
        {data.summary}
      </Text>
    </View>

    <View style={styles.section}>
      <Text style={styles.heading}>
        Experience
      </Text>

      <Text wrap>
        {data.experience}
      </Text>
    </View>

    <View style={styles.section}>
      <Text style={styles.heading}>
        Projects
      </Text>

      <Text wrap>
        {data.projects}
      </Text>
    </View>

    <View style={styles.section}>
      <Text style={styles.heading}>
        Education
      </Text>

      <Text>
        {data.education}
      </Text>
    </View>

    <View style={styles.section}>
      <Text style={styles.heading}>
        Achievements
      </Text>

      <Text>
        {data.achievements}
      </Text>
    </View>

  </View>

</View>
       
      </Page>
    </Document>
  );
}